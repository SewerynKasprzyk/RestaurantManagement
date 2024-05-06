package pl.polsl.project.restaurantmanagement.services;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.project.restaurantmanagement.model.User;
import pl.polsl.project.restaurantmanagement.model.UserType;
import pl.polsl.project.restaurantmanagement.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User saveOrUpdateUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Integer id) {
        return userRepository.findById(id).orElse(null);
    }

    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }

    @PostConstruct
    public void initializeExampleUsers() {
        List<User> exampleUsers = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            User user = new User();
            user.setUserType(UserType.CUSTOMER);
            user.setLogin("user" + i);
            user.setPassword("password" + i);
            user.setName("User " + i);
            user.setSurname("Surname " + i);
            user.setPhoneNumber("123456789" + i);
            user.setVerified(true);
            user.setActive(true);
            exampleUsers.add(user);
        }
        userRepository.saveAll(exampleUsers);
    }

}

