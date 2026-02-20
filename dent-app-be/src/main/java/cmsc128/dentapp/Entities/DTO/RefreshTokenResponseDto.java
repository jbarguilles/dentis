package cmsc128.dentapp.Entities.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefreshTokenResponseDto {
  private String message;
  private boolean success;
  private long accessTokenExpiresIn; // in milliseconds
  private String sessionId;
}
