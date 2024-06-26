package pl.polsl.project.restaurantmanagement.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.project.restaurantmanagement.configuration.ReservationMapper;
import pl.polsl.project.restaurantmanagement.configuration.UserAuthProvider;
import pl.polsl.project.restaurantmanagement.configuration.UserMapper;
import pl.polsl.project.restaurantmanagement.model.DTO.UserDto;
import pl.polsl.project.restaurantmanagement.model.User;
import pl.polsl.project.restaurantmanagement.services.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private UserAuthProvider userAuthProvider;

    @Autowired
    private UserMapper userMapper;

    @Autowired
    ReservationMapper reservationMapper;

    @GetMapping
    public List<User> getAllUsers() {

        logger.debug("Getting all users");
        return userService.getAllUsers();
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsersWithQuery() {
        List<User> users = userService.findAllUsersWithQuery();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Integer userId) {
        User user = userService.getUserById(userId);
        UserDto userDto = userMapper.toUserDto(user);
        return ResponseEntity.ok(userDto);
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveOrUpdateUser(user);
    }

    @PutMapping("/{userId}")
    public User updateUser(@PathVariable Integer userId, @RequestBody User user) {
        user = userService.getUserById(userId);
        return userService.saveOrUpdateUser(user);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Integer userId) {
        userService.deleteUser(userId);
    }

    @GetMapping("/me")
    public ResponseEntity<UserDto> getLoggedInUser(@RequestHeader("Authorization") String token) {
        logger.debug("Received Authorization token: {}", token);

        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }

        logger.debug("Processed token: {}", token);

        UserDto user = userAuthProvider.getUserFromToken(token);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/employees")
    public List<User> getEmployees() {
        logger.debug("Getting all employees");
        return userService.getAllEmployees();
    }

    @GetMapping("/activeEmployees")
    public List<User> getActiveEmployees() {
        logger.debug("Getting all active employees");
        return userService.getActiveEmployees();
    }

    @PutMapping("/{userId}/setInactive")
    public ResponseEntity<UserDto> setUserInactive(@PathVariable Integer userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            user.setIsActive(false);
            userService.saveOrUpdateUser(user);
            return ResponseEntity.ok(userMapper.toUserDto(user));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
