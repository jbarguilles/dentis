package cmsc128.dentapp.Entities.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDto {
  private String message;
  private boolean success;
  private UserDto user;
  private String sessionId;
  private long accessTokenExpiresIn; // in milliseconds
  private long refreshTokenExpiresIn; // in milliseconds
}
