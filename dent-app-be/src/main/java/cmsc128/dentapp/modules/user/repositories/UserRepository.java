package cmsc128.dentapp.modules.user.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import cmsc128.dentapp.modules.user.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

  /** Find user by username */
  Optional<User> findByUsername(String username);

  /** Find user by email */
  Optional<User> findByEmail(String email);

  /** Find user by username or email */
  @Query("SELECT u FROM USER u WHERE u.username = :usernameOrEmail OR u.email = :usernameOrEmail")
  Optional<User> findByUsernameOrEmail(@Param("usernameOrEmail") String usernameOrEmail);

  /** Check if username exists */
  boolean existsByUsername(String username);

  /** Check if email exists */
  boolean existsByEmail(String email);

  /** Find all active users */
  List<User> findByIsActive(Boolean isActive);

  /** Find users by role */
  List<User> findByRole(User.UserRole role);

  /** Find active users by role */
  List<User> findByRoleAndIsActive(User.UserRole role, Boolean isActive);

  /** Find users by first name and last name */
  @Query(
      "SELECT u FROM USER u WHERE LOWER(u.firstName) LIKE LOWER(CONCAT('%', :firstName, '%')) AND LOWER(u.lastName) LIKE LOWER(CONCAT('%', :lastName, '%'))")
  List<User> findByFirstNameContainingIgnoreCaseAndLastNameContainingIgnoreCase(
      @Param("firstName") String firstName, @Param("lastName") String lastName);
}
