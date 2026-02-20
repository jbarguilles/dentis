package cmsc128.dentapp.Entities.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {
  private String message;
  private UserDto user;
  private boolean success;

  public LoginResponseDto(String message, boolean success) {
    this.message = message;
    this.success = success;
  }
}
