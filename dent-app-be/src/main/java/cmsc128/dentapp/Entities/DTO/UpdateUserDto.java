package cmsc128.dentapp.Entities.DTO;

import cmsc128.dentapp.modules.user.entities.User.UserRole;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserDto {

  @Email(message = "Please provide a valid email address")
  private String email;

  private String firstName;

  private String middleName;

  private String lastName;

  private UserRole role;

  private Boolean isActive;
}
