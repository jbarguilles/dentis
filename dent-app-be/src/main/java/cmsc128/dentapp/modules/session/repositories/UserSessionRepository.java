package cmsc128.dentapp.modules.session.repositories;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import cmsc128.dentapp.modules.session.entities.UserSession;
import cmsc128.dentapp.modules.user.entities.User;

@Repository
public interface UserSessionRepository extends JpaRepository<UserSession, String> {

  Optional<UserSession> findBySessionIdAndIsActiveTrue(String sessionId);

  Optional<UserSession> findByRefreshTokenAndIsActiveTrue(String refreshToken);

  List<UserSession> findByUserAndIsActiveTrueOrderByCreatedAtDesc(User user);

  List<UserSession> findByUserUserIdAndIsActiveTrueOrderByCreatedAtDesc(Long userId);

  @Query("SELECT us FROM USER_SESSION us WHERE us.user.userId = :userId AND us.isActive = true")
  List<UserSession> findActiveSessionsByUserId(@Param("userId") Long userId);

  @Modifying
  @Query("UPDATE USER_SESSION us SET us.isActive = false WHERE us.user.userId = :userId")
  int deactivateAllSessionsForUser(@Param("userId") Long userId);

  @Modifying
  @Query("UPDATE USER_SESSION us SET us.isActive = false WHERE us.sessionId = :sessionId")
  int deactivateSession(@Param("sessionId") String sessionId);

  @Modifying
  @Query("DELETE FROM USER_SESSION us WHERE us.expiresAt < :now OR us.isActive = false")
  int cleanupExpiredAndInactiveSessions(@Param("now") LocalDateTime now);

  @Query(
      "SELECT COUNT(us) FROM USER_SESSION us WHERE us.user.userId = :userId AND us.isActive = true")
  long countActiveSessionsForUser(@Param("userId") Long userId);

  @Query("SELECT us FROM USER_SESSION us WHERE us.expiresAt < :now AND us.isActive = true")
  List<UserSession> findExpiredActiveSessions(@Param("now") LocalDateTime now);
}
