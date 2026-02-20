package cmsc128.dentapp.Service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Legacy password encoder that can handle both old and new password formats This is a temporary
 * solution for migration purposes
 */
@Component
public class LegacyPasswordEncoder implements PasswordEncoder {

  private final PasswordEncoder bcryptEncoder;

  public LegacyPasswordEncoder(PasswordEncoder bcryptEncoder) {
    this.bcryptEncoder = bcryptEncoder;
  }

  @Override
  public String encode(CharSequence rawPassword) {
    // Always use BCrypt for new passwords
    return bcryptEncoder.encode(rawPassword);
  }

  @Override
  public boolean matches(CharSequence rawPassword, String encodedPassword) {
    // First try BCrypt (for new passwords)
    if (encodedPassword.startsWith("$2a$")
        || encodedPassword.startsWith("$2b$")
        || encodedPassword.startsWith("$2y$")) {
      return bcryptEncoder.matches(rawPassword, encodedPassword);
    }

    // Try legacy Base64 SHA-256 encoding (for old passwords)
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      byte[] hash = digest.digest(rawPassword.toString().getBytes());
      String base64Hash = Base64.getEncoder().encodeToString(hash);
      return base64Hash.equals(encodedPassword);
    } catch (NoSuchAlgorithmException e) {
      return false;
    }
  }
}
