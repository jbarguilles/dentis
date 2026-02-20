package cmsc128.dentapp.modules.session.entities;

import java.time.LocalDateTime;

import cmsc128.dentapp.modules.user.entities.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "USER_SESSION")
@Table(name = "USER_SESSION")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSession {

  @Id
  @Column(name = "SESSION_ID", nullable = false)
  private String sessionId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(
      name = "USER_ID",
      nullable = false,
      foreignKey = @ForeignKey(name = "FK_USER_SESSION_USER"))
  private User user;

  @Column(name = "REFRESH_TOKEN", nullable = false, length = 1000)
  private String refreshToken;

  @Column(name = "IP_ADDRESS")
  private String ipAddress;

  @Column(name = "USER_AGENT", length = 500)
  private String userAgent;

  @Column(name = "CREATED_AT", nullable = false)
  private LocalDateTime createdAt;

  @Column(name = "EXPIRES_AT", nullable = false)
  private LocalDateTime expiresAt;

  @Column(name = "LAST_ACCESSED", nullable = false)
  private LocalDateTime lastAccessed;

  @Column(name = "IS_ACTIVE", nullable = false)
  private Boolean isActive = true;

  @PrePersist
  protected void onCreate() {
    createdAt = LocalDateTime.now();
    lastAccessed = LocalDateTime.now();
    if (isActive == null) {
      isActive = true;
    }
  }

  @PreUpdate
  protected void onUpdate() {
    lastAccessed = LocalDateTime.now();
  }

  public boolean isExpired() {
    return LocalDateTime.now().isAfter(expiresAt);
  }

  public void updateLastAccessed() {
    this.lastAccessed = LocalDateTime.now();
  }

  public void deactivate() {
    this.isActive = false;
  }
}
