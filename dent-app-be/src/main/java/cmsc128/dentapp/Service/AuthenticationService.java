package cmsc128.dentapp.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import cmsc128.dentapp.Entities.DTO.*;
import cmsc128.dentapp.Utils.JwtTokenUtil;
import cmsc128.dentapp.modules.session.entities.UserSession;
import cmsc128.dentapp.modules.session.repositories.UserSessionRepository;
import cmsc128.dentapp.modules.user.entities.User;
import cmsc128.dentapp.modules.user.repositories.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

  private final UserRepository userRepository;
  private final UserSessionRepository userSessionRepository;
  private final JwtTokenUtil jwtTokenUtil;
  private final PasswordEncoder passwordEncoder;

  @Value("${app.cookie.domain:localhost}")
  private String cookieDomain;

  @Value("${app.cookie.secure:false}")
  private boolean cookieSecure;

  @Value("${app.cookie.same-site:Lax}")
  private String cookieSameSite;

  @Transactional
  public AuthResponseDto authenticate(
      LoginRequestDto loginRequest, HttpServletRequest request, HttpServletResponse response) {
    try {
      // Find user by username
      Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());

      if (userOptional.isEmpty()) {
        return new AuthResponseDto("Invalid username or password", false, null, null, 0, 0);
      }

      User user = userOptional.get();

      // Verify password
      if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
        return new AuthResponseDto("Invalid username or password", false, null, null, 0, 0);
      }

      // Create session
      String sessionId = UUID.randomUUID().toString();
      String refreshToken =
          jwtTokenUtil.generateRefreshToken(user.getUsername(), user.getUserId(), sessionId);
      String accessToken =
          jwtTokenUtil.generateAccessToken(
              user.getUsername(), user.getRole().toString(), user.getUserId());

      // Save session to database
      UserSession session = new UserSession();
      session.setSessionId(sessionId);
      session.setUser(user);
      session.setRefreshToken(refreshToken);
      session.setIpAddress(getClientIpAddress(request));
      session.setUserAgent(request.getHeader("User-Agent"));
      session.setExpiresAt(LocalDateTime.now().plusSeconds(604800)); // 7 days
      session.setIsActive(true);

      userSessionRepository.save(session);

      // Set cookies
      setAccessTokenCookie(response, accessToken);
      setRefreshTokenCookie(response, refreshToken);

      // Convert user to DTO
      UserDto userDto = convertToUserDto(user);

      return new AuthResponseDto(
          "Login successful",
          true,
          userDto,
          sessionId,
          jwtTokenUtil.getAccessTokenExpirationTime(),
          jwtTokenUtil.getRefreshTokenExpirationTime());

    } catch (Exception e) {
      return new AuthResponseDto(
          "Authentication failed: " + e.getMessage(), false, null, null, 0, 0);
    }
  }

  @Transactional
  public RefreshTokenResponseDto refreshAccessToken(
      String refreshToken, HttpServletRequest request, HttpServletResponse response) {
    try {
      if (refreshToken == null || refreshToken.trim().isEmpty()) {
        return new RefreshTokenResponseDto("Refresh token is required", false, 0, null);
      }

      // Validate refresh token
      String username = jwtTokenUtil.getUsernameFromToken(refreshToken);

      if (!jwtTokenUtil.validateRefreshToken(refreshToken, username)) {
        return new RefreshTokenResponseDto("Invalid refresh token", false, 0, null);
      }

      // Find session in database
      Optional<UserSession> sessionOptional =
          userSessionRepository.findByRefreshTokenAndIsActiveTrue(refreshToken);

      if (sessionOptional.isEmpty()) {
        return new RefreshTokenResponseDto("Session not found or expired", false, 0, null);
      }

      UserSession session = sessionOptional.get();

      if (session.isExpired()) {
        session.deactivate();
        userSessionRepository.save(session);
        return new RefreshTokenResponseDto("Session expired", false, 0, null);
      }

      // Find user
      User user = session.getUser();

      // Generate new access token
      String newAccessToken =
          jwtTokenUtil.generateAccessToken(
              user.getUsername(), user.getRole().toString(), user.getUserId());

      // Update session last accessed time
      session.updateLastAccessed();
      userSessionRepository.save(session);

      // Set new access token cookie
      setAccessTokenCookie(response, newAccessToken);

      return new RefreshTokenResponseDto(
          "Access token refreshed successfully",
          true,
          jwtTokenUtil.getAccessTokenExpirationTime(),
          session.getSessionId());

    } catch (Exception e) {
      return new RefreshTokenResponseDto("Token refresh failed: " + e.getMessage(), false, 0, null);
    }
  }

  @Transactional
  public ApiResponse logout(String refreshToken, HttpServletResponse response) {
    try {
      if (refreshToken != null && !refreshToken.trim().isEmpty()) {
        // Find and deactivate session
        Optional<UserSession> sessionOptional =
            userSessionRepository.findByRefreshTokenAndIsActiveTrue(refreshToken);
        sessionOptional.ifPresent(
            session -> {
              session.deactivate();
              userSessionRepository.save(session);
            });
      }

      // Clear cookies
      clearAuthCookies(response);

      return new ApiResponse("Logged out successfully", true);
    } catch (Exception e) {
      return new ApiResponse("Logout failed: " + e.getMessage(), false);
    }
  }

  @Transactional
  public ApiResponse logoutAllSessions(Long userId, HttpServletResponse response) {
    try {
      userSessionRepository.deactivateAllSessionsForUser(userId);
      clearAuthCookies(response);
      return new ApiResponse("All sessions logged out successfully", true);
    } catch (Exception e) {
      return new ApiResponse("Logout all failed: " + e.getMessage(), false);
    }
  }

  public UserDto getCurrentUser(String accessToken) {
    try {
      if (accessToken == null || accessToken.trim().isEmpty()) {
        return null;
      }

      String username = jwtTokenUtil.getUsernameFromToken(accessToken);

      if (!jwtTokenUtil.validateAccessToken(accessToken, username)) {
        return null;
      }

      Optional<User> userOptional = userRepository.findByUsername(username);
      return userOptional.map(this::convertToUserDto).orElse(null);

    } catch (Exception e) {
      return null;
    }
  }

  public boolean validateAccessToken(String accessToken) {
    try {
      if (accessToken == null || accessToken.trim().isEmpty()) {
        return false;
      }

      String username = jwtTokenUtil.getUsernameFromToken(accessToken);
      return jwtTokenUtil.validateAccessToken(accessToken, username);
    } catch (Exception e) {
      return false;
    }
  }

  @Transactional
  public void cleanupExpiredSessions() {
    userSessionRepository.cleanupExpiredAndInactiveSessions(LocalDateTime.now());
  }

  private void setAccessTokenCookie(HttpServletResponse response, String accessToken) {
    Cookie cookie = new Cookie("accessToken", accessToken);
    cookie.setHttpOnly(true);
    cookie.setPath("/");
    cookie.setMaxAge(15 * 60); // 15 minutes
    cookie.setSecure(cookieSecure);
    // cookie.setAttribute("SameSite", cookieSameSite); // Note: This may not work in all servlet
    // containers
    response.addCookie(cookie);
  }

  private void setRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
    Cookie cookie = new Cookie("refreshToken", refreshToken);
    cookie.setHttpOnly(true);
    cookie.setPath("/");
    cookie.setMaxAge(7 * 24 * 60 * 60); // 7 days
    cookie.setSecure(cookieSecure);
    // cookie.setAttribute("SameSite", cookieSameSite); // Note: This may not work in all servlet
    // containers
    response.addCookie(cookie);
  }

  private void clearAuthCookies(HttpServletResponse response) {
    // Clear access token cookie
    Cookie accessTokenCookie = new Cookie("accessToken", "");
    accessTokenCookie.setHttpOnly(true);
    accessTokenCookie.setPath("/");
    accessTokenCookie.setMaxAge(0);
    response.addCookie(accessTokenCookie);

    // Clear refresh token cookie
    Cookie refreshTokenCookie = new Cookie("refreshToken", "");
    refreshTokenCookie.setHttpOnly(true);
    refreshTokenCookie.setPath("/");
    refreshTokenCookie.setMaxAge(0);
    response.addCookie(refreshTokenCookie);
  }

  private String getClientIpAddress(HttpServletRequest request) {
    String xForwardedFor = request.getHeader("X-Forwarded-For");
    if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
      return xForwardedFor.split(",")[0].trim();
    }

    String xRealIp = request.getHeader("X-Real-IP");
    if (xRealIp != null && !xRealIp.isEmpty()) {
      return xRealIp;
    }

    return request.getRemoteAddr();
  }

  private UserDto convertToUserDto(User user) {
    UserDto userDto = new UserDto();
    userDto.setUserId(user.getUserId());
    userDto.setUsername(user.getUsername());
    userDto.setEmail(user.getEmail());
    userDto.setFirstName(user.getFirstName());
    userDto.setMiddleName(user.getMiddleName());
    userDto.setLastName(user.getLastName());
    userDto.setRole(user.getRole());
    userDto.setCreatedDate(user.getCreatedDate());
    userDto.setUpdatedDate(user.getUpdatedDate());
    return userDto;
  }
}
