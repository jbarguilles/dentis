package cmsc128.dentapp.Security;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import cmsc128.dentapp.Utils.JwtTokenUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

  private final JwtTokenUtil jwtTokenUtil;

  @Override
  protected void doFilterInternal(
      HttpServletRequest request, HttpServletResponse response, FilterChain chain)
      throws ServletException, IOException {

    log.info(
        "JWT Filter - Processing request: {} {}", request.getMethod(), request.getRequestURI());
    log.info("JWT Filter - Context path: {}", request.getContextPath());

    try {
      String jwt = getAccessTokenFromCookies(request);
      log.info("JWT Filter - Access token found: {}", jwt != null);

      if (jwt != null && SecurityContextHolder.getContext().getAuthentication() == null) {
        String username = jwtTokenUtil.getUsernameFromToken(jwt);
        log.info("JWT Filter - Username from token: {}", username);

        if (username != null && jwtTokenUtil.validateAccessToken(jwt, username)) {
          String role = jwtTokenUtil.getRole(jwt);
          Long userId = jwtTokenUtil.getUserId(jwt);
          log.info("JWT Filter - Valid token, User ID: {}, Role: {}", userId, role);

          List<SimpleGrantedAuthority> authorities =
              Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role));

          UsernamePasswordAuthenticationToken authToken =
              new UsernamePasswordAuthenticationToken(username, null, authorities);

          // Add user ID to the authentication details
          CustomAuthenticationDetails details = new CustomAuthenticationDetails(userId, role);
          authToken.setDetails(details);

          SecurityContextHolder.getContext().setAuthentication(authToken);
          log.info("JWT Filter - Authentication set successfully");
        } else {
          log.info("JWT Filter - Token validation failed");
        }
      } else {
        log.info("JWT Filter - No JWT token found or authentication already set");
      }
    } catch (Exception e) {
      log.error("Cannot set user authentication: {}", e.getMessage(), e);
    }

    log.info("JWT Filter - Proceeding with filter chain");
    chain.doFilter(request, response);
  }

  private String getAccessTokenFromCookies(HttpServletRequest request) {
    if (request.getCookies() == null) {
      return null;
    }

    return Arrays.stream(request.getCookies())
        .filter(cookie -> "accessToken".equals(cookie.getName()))
        .findFirst()
        .map(Cookie::getValue)
        .orElse(null);
  }

  @Override
  protected boolean shouldNotFilter(HttpServletRequest request) {
    String originalPath = request.getRequestURI();
    String contextPath = request.getContextPath();

    log.info("JWT Filter - shouldNotFilter check:");
    log.info("JWT Filter - Original URI: {}", originalPath);
    log.info("JWT Filter - Context path: {}", contextPath);

    // Remove context path to get the relative path
    String path = originalPath;
    if (contextPath != null && !contextPath.isEmpty() && path.startsWith(contextPath)) {
      path = path.substring(contextPath.length());
    }

    log.info("JWT Filter - Processed path: {}", path);

    boolean shouldSkip =
        path.startsWith("/auth/login")
            || path.startsWith("/auth/refresh")
            || path.startsWith("/user/signup")
            || path.startsWith("/swagger-ui")
            || path.startsWith("/v3/api-docs")
            || path.startsWith("/actuator");

    log.info("JWT Filter - Should skip authentication: {}", shouldSkip);

    return shouldSkip;
  }

  // Custom authentication details to store user ID and role
  public static class CustomAuthenticationDetails {
    private final Long userId;
    private final String role;

    public CustomAuthenticationDetails(Long userId, String role) {
      this.userId = userId;
      this.role = role;
    }

    public Long getUserId() {
      return userId;
    }

    public String getRole() {
      return role;
    }
  }
}
