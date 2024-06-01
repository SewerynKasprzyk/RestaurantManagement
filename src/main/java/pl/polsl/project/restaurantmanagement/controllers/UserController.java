package pl.polsl.project.restaurantmanagement.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.project.restaurantmanagement.configuration.UserAuthProvider;
import pl.polsl.project.restaurantmanagement.model.DTO.UserDto;
import pl.polsl.project.restaurantmanagement.model.User;
import pl.polsl.project.restaurantmanagement.services.UserService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private UserAuthProvider userAuthProvider;

    @GetMapping
    public List<User> getAllUsers() {

        logger.debug("Getting all users");
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable Integer userId) {
        return userService.getUserById(userId);
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
}
