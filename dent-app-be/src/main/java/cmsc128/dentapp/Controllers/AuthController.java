package cmsc128.dentapp.Controllers;

import java.security.Principal;
import java.util.Arrays;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import cmsc128.dentapp.Entities.DTO.*;
import cmsc128.dentapp.Service.AuthenticationService;
import cmsc128.dentapp.Utils.JwtTokenUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@CrossOrigin(
    origins = {"http://localhost:3000", "http://localhost:3001"},
    allowCredentials = "true")
@RestController
@RequestMapping(path = {"/auth"})
@RequiredArgsConstructor
@Slf4j
public class AuthController {

  private final AuthenticationService authenticationService;
  private final JwtTokenUtil jwtTokenUtil;

  /** User login endpoint */
  @PostMapping(path = {"/login"})
  public ResponseEntity<AuthResponseDto> login(
      @Valid @RequestBody LoginRequestDto loginRequest,
      HttpServletRequest request,
      HttpServletResponse response) {

    log.info("AuthController - Login attempt for username: {}", loginRequest.getUsername());
    log.info("AuthController - Request URI: {}", request.getRequestURI());
    log.info("AuthController - Context path: {}", request.getContextPath());
    log.info("AuthController - Method: {}", request.getMethod());

    try {
      AuthResponseDto authResponse =
          authenticationService.authenticate(loginRequest, request, response);
      log.info("AuthController - Authentication result: success={}", authResponse.isSuccess());

      if (authResponse.isSuccess()) {
        log.info("AuthController - Login successful, returning OK response");
        return ResponseEntity.ok(authResponse);
      } else {
        log.info("AuthController - Login failed: {}", authResponse.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(authResponse);
      }
    } catch (Exception e) {
      log.error("AuthController - Login error: {}", e.getMessage(), e);
      AuthResponseDto errorResponse = new AuthResponseDto();
      errorResponse.setMessage("Login failed due to server error: " + e.getMessage());
      errorResponse.setSuccess(false);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
  }

  /** Refresh access token endpoint */
  @PostMapping(path = {"/refresh"})
  public ResponseEntity<RefreshTokenResponseDto> refreshToken(
      HttpServletRequest request, HttpServletResponse response) {

    String refreshToken = getRefreshTokenFromCookies(request);

    if (refreshToken == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body(new RefreshTokenResponseDto("Refresh token not found", false, 0, null));
    }

    RefreshTokenResponseDto refreshResponse =
        authenticationService.refreshAccessToken(refreshToken, request, response);

    if (refreshResponse.isSuccess()) {
      return ResponseEntity.ok(refreshResponse);
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(refreshResponse);
    }
  }

  /** Alternative refresh token endpoint that accepts token in request body */
  @PostMapping(path = {"/refresh-token"})
  public ResponseEntity<RefreshTokenResponseDto> refreshTokenFromBody(
      @Valid @RequestBody RefreshTokenRequestDto refreshTokenRequest,
      HttpServletRequest request,
      HttpServletResponse response) {

    RefreshTokenResponseDto refreshResponse =
        authenticationService.refreshAccessToken(
            refreshTokenRequest.getRefreshToken(), request, response);

    if (refreshResponse.isSuccess()) {
      return ResponseEntity.ok(refreshResponse);
    } else {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(refreshResponse);
    }
  }

  /** User logout endpoint */
  @PostMapping(path = {"/logout"})
  public ResponseEntity<ApiResponse> logout(
      HttpServletRequest request, HttpServletResponse response) {

    String refreshToken = getRefreshTokenFromCookies(request);
    ApiResponse logoutResponse = authenticationService.logout(refreshToken, response);

    return ResponseEntity.ok(logoutResponse);
  }

  /** Logout from all sessions endpoint */
  @PostMapping(path = {"/logout-all"})
  public ResponseEntity<ApiResponse> logoutAll(
      HttpServletRequest request, HttpServletResponse response, Principal principal) {

    if (principal == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body(new ApiResponse("User not authenticated", false));
    }

    try {
      String accessToken = getAccessTokenFromCookies(request);
      if (accessToken != null) {
        Long userId = jwtTokenUtil.getUserId(accessToken);
        ApiResponse logoutResponse = authenticationService.logoutAllSessions(userId, response);
        return ResponseEntity.ok(logoutResponse);
      } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(new ApiResponse("Access token not found", false));
      }
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ApiResponse("Logout all failed: " + e.getMessage(), false));
    }
  }

  /** Get current user endpoint */
  @GetMapping(path = {"/me"})
  public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {
    try {
      String accessToken = getAccessTokenFromCookies(request);

      if (accessToken == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(new ApiResponse("Access token not found", false));
      }

      UserDto user = authenticationService.getCurrentUser(accessToken);

      if (user != null) {
        return ResponseEntity.ok(user);
      } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(new ApiResponse("Invalid or expired token", false));
      }
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ApiResponse("Error retrieving user: " + e.getMessage(), false));
    }
  }

  /** Validate token endpoint */
  @GetMapping(path = {"/validate"})
  public ResponseEntity<ApiResponse> validateToken(HttpServletRequest request) {
    try {
      String accessToken = getAccessTokenFromCookies(request);

      if (accessToken == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(new ApiResponse("Access token not found", false));
      }

      boolean isValid = authenticationService.validateAccessToken(accessToken);

      if (isValid) {
        return ResponseEntity.ok(new ApiResponse("Token is valid", true));
      } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(new ApiResponse("Token is invalid or expired", false));
      }
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ApiResponse("Token validation failed: " + e.getMessage(), false));
    }
  }

  /** Check if token should be refreshed endpoint */
  @GetMapping(path = {"/should-refresh"})
  public ResponseEntity<?> shouldRefreshToken(HttpServletRequest request) {
    try {
      String accessToken = getAccessTokenFromCookies(request);

      if (accessToken == null) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(new ApiResponse("Access token not found", false));
      }

      boolean shouldRefresh = jwtTokenUtil.shouldRefreshToken(accessToken);
      long timeUntilExpiration = jwtTokenUtil.getTimeUntilExpiration(accessToken);

      return ResponseEntity.ok(
          new ShouldRefreshResponseDto(
              shouldRefresh, timeUntilExpiration, "Token refresh check completed"));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ApiResponse("Token refresh check failed: " + e.getMessage(), false));
    }
  }

  /** Cleanup expired sessions endpoint (admin only) */
  @PostMapping(path = {"/cleanup-sessions"})
  public ResponseEntity<ApiResponse> cleanupExpiredSessions() {
    try {
      authenticationService.cleanupExpiredSessions();
      return ResponseEntity.ok(new ApiResponse("Expired sessions cleaned up successfully", true));
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ApiResponse("Session cleanup failed: " + e.getMessage(), false));
    }
  }

  // Helper methods to extract tokens from cookies
  private String getAccessTokenFromCookies(HttpServletRequest request) {
    return getTokenFromCookies(request, "accessToken");
  }

  private String getRefreshTokenFromCookies(HttpServletRequest request) {
    return getTokenFromCookies(request, "refreshToken");
  }

  private String getTokenFromCookies(HttpServletRequest request, String cookieName) {
    if (request.getCookies() == null) {
      return null;
    }

    return Arrays.stream(request.getCookies())
        .filter(cookie -> cookieName.equals(cookie.getName()))
        .findFirst()
        .map(Cookie::getValue)
        .orElse(null);
  }

  // DTO for should refresh response
  public static class ShouldRefreshResponseDto {
    private boolean shouldRefresh;
    private long timeUntilExpiration;
    private String message;

    public ShouldRefreshResponseDto(
        boolean shouldRefresh, long timeUntilExpiration, String message) {
      this.shouldRefresh = shouldRefresh;
      this.timeUntilExpiration = timeUntilExpiration;
      this.message = message;
    }

    // Getters and setters
    public boolean isShouldRefresh() {
      return shouldRefresh;
    }

    public void setShouldRefresh(boolean shouldRefresh) {
      this.shouldRefresh = shouldRefresh;
    }

    public long getTimeUntilExpiration() {
      return timeUntilExpiration;
    }

    public void setTimeUntilExpiration(long timeUntilExpiration) {
      this.timeUntilExpiration = timeUntilExpiration;
    }

    public String getMessage() {
      return message;
    }

    public void setMessage(String message) {
      this.message = message;
    }
  }
}
