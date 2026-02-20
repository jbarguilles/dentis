package cmsc128.dentapp.modules.user.entities;

import java.util.Date;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "USER")
@Table(name = "\"USER\"")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
  @Id
  @SequenceGenerator(name = "USER_SEQ", sequenceName = "USER_SEQ", allocationSize = 1)
  @Column(name = "USER_ID", nullable = false)
  @GeneratedValue(strategy = GenerationType.AUTO, generator = "USER_SEQ")
  private Long userId;

  @Column(name = "USERNAME", nullable = false, unique = true)
  private String username;

  @Column(name = "EMAIL", nullable = false, unique = true)
  private String email;

  @Column(name = "PASSWORD", nullable = false)
  private String password;

  @Column(name = "FIRST_NAME", nullable = false)
  private String firstName;

  @Column(name = "MIDDLE_NAME")
  private String middleName;

  @Column(name = "LAST_NAME", nullable = false)
  private String lastName;

  @Enumerated(EnumType.STRING)
  @Column(name = "ROLE", nullable = false)
  private UserRole role;

  @Column(name = "CREATED_DATE", nullable = false)
  @Temporal(TemporalType.TIMESTAMP)
  private Date createdDate;

  @Column(name = "UPDATED_DATE")
  @Temporal(TemporalType.TIMESTAMP)
  private Date updatedDate;

  @Column(name = "IS_ACTIVE", nullable = false)
  private Boolean isActive = true;

  @PrePersist
  protected void onCreate() {
    createdDate = new Date();
    if (isActive == null) {
      isActive = true;
    }
  }

  @PreUpdate
  protected void onUpdate() {
    updatedDate = new Date();
  }

  public enum UserRole {
    ADMIN,
    STAFF,
    FACULTY,
    CLINICIAN,
    SUPERADMIN
  }
}
