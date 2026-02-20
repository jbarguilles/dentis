package cmsc128.dentapp.Utils;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenUtil {

  @Value("${jwt.secret:mySecretKey}")
  private String secret;

  @Value("${jwt.access-token-expiration:900}") // 15 minutes in seconds
  private int accessTokenExpiration;

  @Value("${jwt.refresh-token-expiration:604800}") // 7 days in seconds
  private int refreshTokenExpiration;

  private SecretKey getSigningKey() {
    return Keys.hmacShaKeyFor(secret.getBytes());
  }

  public String generateAccessToken(String username, String role, Long userId) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("role", role);
    claims.put("userId", userId);
    claims.put("tokenType", "ACCESS");
    return createToken(claims, username, accessTokenExpiration);
  }

  public String generateRefreshToken(String username, Long userId, String sessionId) {
    Map<String, Object> claims = new HashMap<>();
    claims.put("userId", userId);
    claims.put("sessionId", sessionId);
    claims.put("tokenType", "REFRESH");
    return createToken(claims, username, refreshTokenExpiration);
  }

  private String createToken(Map<String, Object> claims, String subject, int expirationSeconds) {
    Date now = new Date();
    Date expirationDate = new Date(now.getTime() + expirationSeconds * 1000L);

    return Jwts.builder()
        .setClaims(claims)
        .setSubject(subject)
        .setIssuedAt(now)
        .setExpiration(expirationDate)
        .signWith(getSigningKey(), SignatureAlgorithm.HS512)
        .compact();
  }

  public String getUsernameFromToken(String token) {
    return getClaimFromToken(token, Claims::getSubject);
  }

  public Date getExpirationDateFromToken(String token) {
    return getClaimFromToken(token, Claims::getExpiration);
  }

  public String getTokenType(String token) {
    return getClaimFromToken(token, claims -> claims.get("tokenType", String.class));
  }

  public String getRole(String token) {
    return getClaimFromToken(token, claims -> claims.get("role", String.class));
  }

  public Long getUserId(String token) {
    return getClaimFromToken(token, claims -> claims.get("userId", Long.class));
  }

  public String getSessionId(String token) {
    return getClaimFromToken(token, claims -> claims.get("sessionId", String.class));
  }

  public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
    final Claims claims = getAllClaimsFromToken(token);
    return claimsResolver.apply(claims);
  }

  private Claims getAllClaimsFromToken(String token) {
    return Jwts.parser().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
  }

  public Boolean isTokenExpired(String token) {
    final Date expiration = getExpirationDateFromToken(token);
    return expiration.before(new Date());
  }

  public Boolean validateAccessToken(String token, String username) {
    final String tokenUsername = getUsernameFromToken(token);
    final String tokenType = getTokenType(token);
    return (tokenUsername.equals(username) && !isTokenExpired(token) && "ACCESS".equals(tokenType));
  }

  public Boolean validateRefreshToken(String token, String username) {
    final String tokenUsername = getUsernameFromToken(token);
    final String tokenType = getTokenType(token);
    return (tokenUsername.equals(username)
        && !isTokenExpired(token)
        && "REFRESH".equals(tokenType));
  }

  public long getAccessTokenExpirationTime() {
    return accessTokenExpiration * 1000L; // Convert to milliseconds
  }

  public long getRefreshTokenExpirationTime() {
    return refreshTokenExpiration * 1000L; // Convert to milliseconds
  }

  public long getTimeUntilExpiration(String token) {
    Date expiration = getExpirationDateFromToken(token);
    return expiration.getTime() - System.currentTimeMillis();
  }

  public boolean shouldRefreshToken(String token) {
    long timeUntilExpiration = getTimeUntilExpiration(token);
    // Refresh if token expires in less than 2 minutes (120 seconds)
    return timeUntilExpiration < 120000; // 2 minutes in milliseconds
  }
}
