package cmsc128.dentapp.modules.user.services;

import java.util.List;
import java.util.Optional;

import cmsc128.dentapp.Entities.DTO.*;
import cmsc128.dentapp.modules.user.entities.User;

public interface UserService {

  /** Register a new user */
  UserDto signUp(SignUpRequestDto signUpRequest);

  /** Get user by ID */
  Optional<UserDto> getUserById(Long userId);

  /** Get user by username */
  Optional<UserDto> getUserByUsername(String username);

  /** Get user by email */
  Optional<UserDto> getUserByEmail(String email);

  /** Get all users */
  List<UserDto> getAllUsers();

  /** Get all active users */
  List<UserDto> getActiveUsers();

  /** Get users by role */
  List<UserDto> getUsersByRole(User.UserRole role);

  /** Update user information */
  UserDto updateUser(Long userId, UpdateUserDto updateUserDto);

  /** Delete user (soft delete - set isActive to false) */
  boolean deleteUser(Long userId);

  /** Activate user account */
  boolean activateUser(Long userId);

  /** Deactivate user account */
  boolean deactivateUser(Long userId);

  /** Check if username exists */
  boolean existsByUsername(String username);

  /** Check if email exists */
  boolean existsByEmail(String email);

  /** Search users by name */
  List<UserDto> searchUsersByName(String firstName, String lastName);
}
