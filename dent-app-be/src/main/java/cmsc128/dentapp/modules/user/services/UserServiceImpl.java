package cmsc128.dentapp.modules.user.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import cmsc128.dentapp.Entities.DTO.*;
import cmsc128.dentapp.modules.user.entities.User;
import cmsc128.dentapp.modules.user.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

  @Autowired private UserRepository userRepository;

  @Autowired private PasswordEncoder passwordEncoder;

  @Override
  public UserDto signUp(SignUpRequestDto signUpRequest) {
    // Check if username already exists
    if (userRepository.existsByUsername(signUpRequest.getUsername())) {
      throw new RuntimeException("Username already exists");
    }

    // Check if email already exists
    if (userRepository.existsByEmail(signUpRequest.getEmail())) {
      throw new RuntimeException("Email already exists");
    }

    // Create new user entity
    User user = new User();
    user.setUsername(signUpRequest.getUsername());
    user.setEmail(signUpRequest.getEmail());
    user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
    user.setFirstName(signUpRequest.getFirstName());
    user.setMiddleName(signUpRequest.getMiddleName());
    user.setLastName(signUpRequest.getLastName());
    user.setRole(signUpRequest.getRole());
    user.setCreatedDate(new Date());
    user.setUpdatedDate(new Date());

    // Save user to database
    User savedUser = userRepository.save(user);

    return convertToDto(savedUser);
  }

  @Override
  public Optional<UserDto> getUserById(Long userId) {
    return userRepository.findById(userId).map(this::convertToDto);
  }

  @Override
  public Optional<UserDto> getUserByUsername(String username) {
    return userRepository.findByUsername(username).map(this::convertToDto);
  }

  @Override
  public Optional<UserDto> getUserByEmail(String email) {
    return userRepository.findByEmail(email).map(this::convertToDto);
  }

  @Override
  public List<UserDto> getAllUsers() {
    return userRepository.findAll().stream().map(this::convertToDto).collect(Collectors.toList());
  }

  @Override
  public List<UserDto> getActiveUsers() {
    return userRepository.findByIsActive(true).stream()
        .map(this::convertToDto)
        .collect(Collectors.toList());
  }

  @Override
  public List<UserDto> getUsersByRole(User.UserRole role) {
    return userRepository.findByRole(role).stream()
        .map(this::convertToDto)
        .collect(Collectors.toList());
  }

  @Override
  public UserDto updateUser(Long userId, UpdateUserDto updateUserDto) {
    Optional<User> userOptional = userRepository.findById(userId);

    if (userOptional.isEmpty()) {
      throw new RuntimeException("User not found");
    }

    User user = userOptional.get();

    // Update fields if provided
    if (updateUserDto.getEmail() != null) {
      // Check if email is already taken by another user
      Optional<User> existingUser = userRepository.findByEmail(updateUserDto.getEmail());
      if (existingUser.isPresent() && !existingUser.get().getUserId().equals(userId)) {
        throw new RuntimeException("Email already exists");
      }
      user.setEmail(updateUserDto.getEmail());
    }

    if (updateUserDto.getFirstName() != null) {
      user.setFirstName(updateUserDto.getFirstName());
    }

    if (updateUserDto.getMiddleName() != null) {
      user.setMiddleName(updateUserDto.getMiddleName());
    }

    if (updateUserDto.getLastName() != null) {
      user.setLastName(updateUserDto.getLastName());
    }

    if (updateUserDto.getRole() != null) {
      user.setRole(updateUserDto.getRole());
    }

    if (updateUserDto.getIsActive() != null) {
      user.setIsActive(updateUserDto.getIsActive());
    }

    User savedUser = userRepository.save(user);
    return convertToDto(savedUser);
  }

  @Override
  public boolean deleteUser(Long userId) {
    Optional<User> userOptional = userRepository.findById(userId);

    if (userOptional.isEmpty()) {
      return false;
    }

    User user = userOptional.get();
    user.setIsActive(false);
    userRepository.save(user);
    return true;
  }

  @Override
  public boolean activateUser(Long userId) {
    Optional<User> userOptional = userRepository.findById(userId);

    if (userOptional.isEmpty()) {
      return false;
    }

    User user = userOptional.get();
    user.setIsActive(true);
    userRepository.save(user);
    return true;
  }

  @Override
  public boolean deactivateUser(Long userId) {
    Optional<User> userOptional = userRepository.findById(userId);

    if (userOptional.isEmpty()) {
      return false;
    }

    User user = userOptional.get();
    user.setIsActive(false);
    userRepository.save(user);
    return true;
  }

  @Override
  public boolean existsByUsername(String username) {
    return userRepository.existsByUsername(username);
  }

  @Override
  public boolean existsByEmail(String email) {
    return userRepository.existsByEmail(email);
  }

  @Override
  public List<UserDto> searchUsersByName(String firstName, String lastName) {
    return userRepository
        .findByFirstNameContainingIgnoreCaseAndLastNameContainingIgnoreCase(firstName, lastName)
        .stream()
        .map(this::convertToDto)
        .collect(Collectors.toList());
  }

  /** Convert User entity to UserDto */
  private UserDto convertToDto(User user) {
    UserDto dto = new UserDto();
    dto.setUserId(user.getUserId());
    dto.setUsername(user.getUsername());
    dto.setEmail(user.getEmail());
    dto.setFirstName(user.getFirstName());
    dto.setMiddleName(user.getMiddleName());
    dto.setLastName(user.getLastName());
    dto.setRole(user.getRole());
    dto.setCreatedDate(user.getCreatedDate());
    dto.setUpdatedDate(user.getUpdatedDate());
    return dto;
  }
}
