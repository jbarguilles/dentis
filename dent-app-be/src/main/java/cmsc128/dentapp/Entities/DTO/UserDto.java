package cmsc128.dentapp.Entities.DTO;

import java.util.Date;

import cmsc128.dentapp.modules.user.entities.User.UserRole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
  private Long userId;
  private String username;
  private String email;
  private String firstName;
  private String middleName;
  private String lastName;
  private UserRole role;
  private Date createdDate;
  private Date updatedDate;
  private Boolean isActive;
}
