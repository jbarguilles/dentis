package cmsc128.dentapp.modules.user.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import cmsc128.dentapp.Entities.DTO.*;
import cmsc128.dentapp.Service.AuthenticationService;
import cmsc128.dentapp.modules.user.entities.User;
import cmsc128.dentapp.modules.user.services.UserService;
import jakarta.validation.Valid;

/**
 * UserController handles user management operations
 *
 * <p>Authentication Requirements: - Most endpoints require authentication via JWT token in
 * 'accessToken' cookie - Admin-only endpoints: /all, /active, /role/{role} - Public endpoints:
 * /signup - User-specific endpoints: /profile (requires authentication but no admin role)
 *
 * <p>Error Responses: - 401 Unauthorized: Missing or invalid JWT token - 403 Forbidden: Valid token
 * but insufficient privileges (non-admin accessing admin endpoints) - 404 Not Found: Requested
 * resource not found - 400 Bad Request: Validation errors or business logic errors
 */
@CrossOrigin
@RestController
@RequestMapping(path = {"/user"})
@Validated
public class UserController {

  @Autowired private UserService userService;

  @Autowired private AuthenticationService authenticationService;

  /** User registration endpoint */
  @PostMapping(path = {"/signup"})
  public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequestDto signUpRequest) {
    try {
      UserDto user = userService.signUp(signUpRequest);
      return ResponseEntity.ok(user);
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(), false));
    }
  }

  /** Get current user profile (requires authentication) */
  @GetMapping(path = {"/profile"})
  public ResponseEntity<?> getProfile() {
    try {
      Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
      if (authentication == null || !authentication.isAuthenticated()) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(new ApiResponse("User not authenticated", false));
      }

      String username = authentication.getName();
      Optional<UserDto> user = userService.getUserByUsername(username);

      if (user.isPresent()) {
        return ResponseEntity.ok(user.get());
      } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ApiResponse("User profile not found", false));
      }
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ApiResponse("Error retrieving profile: " + e.getMessage(), false));
    }
  }

  /** Get user by ID */
  @GetMapping(path = {"/{id}"})
  public ResponseEntity<?> getUserById(@PathVariable Long id) {
    Optional<UserDto> user = userService.getUserById(id);
    if (user.isPresent()) {
      return ResponseEntity.ok(user.get());
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  /** Get user by username */
  @GetMapping(path = {"/username/{username}"})
  public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
    Optional<UserDto> user = userService.getUserByUsername(username);
    if (user.isPresent()) {
      return ResponseEntity.ok(user.get());
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  /** Get all users (Admin only) */
  @GetMapping(path = {"/all"})
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> getAllUsers() {
    try {
      List<UserDto> users = userService.getAllUsers();
      return ResponseEntity.ok(users);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ApiResponse("Error retrieving users: " + e.getMessage(), false));
    }
  }

  /** Get all active users (Admin only) */
  @GetMapping(path = {"/active"})
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> getActiveUsers() {
    try {
      List<UserDto> users = userService.getActiveUsers();
      return ResponseEntity.ok(users);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ApiResponse("Error retrieving active users: " + e.getMessage(), false));
    }
  }

  /** Get users by role (Admin only) */
  @GetMapping(path = {"/role/{role}"})
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<?> getUsersByRole(@PathVariable User.UserRole role) {
    try {
      List<UserDto> users = userService.getUsersByRole(role);
      return ResponseEntity.ok(users);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(new ApiResponse("Error retrieving users by role: " + e.getMessage(), false));
    }
  }

  /** Update user information */
  @PutMapping(path = {"/{id}"})
  public ResponseEntity<?> updateUser(
      @PathVariable Long id, @Valid @RequestBody UpdateUserDto updateUserDto) {
    try {
      UserDto updatedUser = userService.updateUser(id, updateUserDto);
      return ResponseEntity.ok(updatedUser);
    } catch (RuntimeException e) {
      return ResponseEntity.badRequest().body(new ApiResponse(e.getMessage(), false));
    }
  }

  /** Delete user (soft delete) */
  @DeleteMapping(path = {"/{id}"})
  public ResponseEntity<?> deleteUser(@PathVariable Long id) {
    boolean deleted = userService.deleteUser(id);
    if (deleted) {
      return ResponseEntity.ok(new ApiResponse("User deleted successfully", true));
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  /** Activate user account */
  @PutMapping(path = {"/{id}/activate"})
  public ResponseEntity<?> activateUser(@PathVariable Long id) {
    boolean activated = userService.activateUser(id);
    if (activated) {
      return ResponseEntity.ok(new ApiResponse("User activated successfully", true));
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  /** Deactivate user account */
  @PutMapping(path = {"/{id}/deactivate"})
  public ResponseEntity<?> deactivateUser(@PathVariable Long id) {
    boolean deactivated = userService.deactivateUser(id);
    if (deactivated) {
      return ResponseEntity.ok(new ApiResponse("User deactivated successfully", true));
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  /** Check if username exists */
  @GetMapping(path = {"/check/username/{username}"})
  public ResponseEntity<Boolean> checkUsernameExists(@PathVariable String username) {
    boolean exists = userService.existsByUsername(username);
    return ResponseEntity.ok(exists);
  }

  /** Check if email exists */
  @GetMapping(path = {"/check/email/{email}"})
  public ResponseEntity<Boolean> checkEmailExists(@PathVariable String email) {
    boolean exists = userService.existsByEmail(email);
    return ResponseEntity.ok(exists);
  }

  /** Search users by name */
  @GetMapping(path = {"/search"})
  public ResponseEntity<List<UserDto>> searchUsersByName(
      @RequestParam(required = false, defaultValue = "") String firstName,
      @RequestParam(required = false, defaultValue = "") String lastName) {
    List<UserDto> users = userService.searchUsersByName(firstName, lastName);
    return ResponseEntity.ok(users);
  }

  /** Generic API response class */
  public static class ApiResponse {
    private String message;
    private boolean success;

    public ApiResponse(String message, boolean success) {
      this.message = message;
      this.success = success;
    }

    // Getters and setters
    public String getMessage() {
      return message;
    }

    public void setMessage(String message) {
      this.message = message;
    }

    public boolean isSuccess() {
      return success;
    }

    public void setSuccess(boolean success) {
      this.success = success;
    }
  }
}
