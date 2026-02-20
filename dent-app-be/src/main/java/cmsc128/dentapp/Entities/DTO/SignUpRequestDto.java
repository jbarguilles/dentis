package cmsc128.dentapp.Entities.DTO;

import cmsc128.dentapp.modules.user.entities.User.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequestDto {

  @NotBlank(message = "Username is required")
  @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
  private String username;

  @NotBlank(message = "Email is required")
  @Email(message = "Please provide a valid email address")
  private String email;

  @NotBlank(message = "Password is required")
  @Size(min = 6, message = "Password must be at least 6 characters long")
  private String password;

  @NotBlank(message = "First name is required")
  private String firstName;

  private String middleName;

  @NotBlank(message = "Last name is required")
  private String lastName;

  @NotNull(message = "Role is required")
  private UserRole role;
}
