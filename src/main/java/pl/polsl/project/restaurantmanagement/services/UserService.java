package pl.polsl.project.restaurantmanagement.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.polsl.project.restaurantmanagement.configuration.AppException;
import pl.polsl.project.restaurantmanagement.model.DTO.CredentialsDto;
import pl.polsl.project.restaurantmanagement.model.DTO.SignUpDto;
import pl.polsl.project.restaurantmanagement.model.DTO.UserDto;
import pl.polsl.project.restaurantmanagement.model.User;
import pl.polsl.project.restaurantmanagement.model.UserType;
import pl.polsl.project.restaurantmanagement.configuration.UserMapper;
import pl.polsl.project.restaurantmanagement.repositories.UserRepository;

import java.nio.CharBuffer;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

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

    public List<User> findAllUsersWithQuery() {
        return userRepository.findAllUsersWithQuery();
    }

    @Transactional
    public void initializeExampleUsers() {
        if (userRepository.count() == 0) { // Check if there are no users in the database
            List<User> exampleUsers = new ArrayList<>();
            for (int i = 1; i <= 10; i++) {
                User user = new User();
                user.setUserType(UserType.CUSTOMER);
                user.setLogin("user" + i);

                user.setPassword(passwordEncoder.encode(CharBuffer.wrap("password" + i)));

                user.setName("User " + i);
                user.setSurname("Surname " + i);
                user.setPhoneNumber("123456789" + i);
                user.setIsVerified(true);
                user.setIsActive(true);
                exampleUsers.add(user);
            }

            //Admin custom user
            User user = new User();
            user.setUserType(UserType.ADMIN);
            user.setLogin("ADMIN");
            user.setPassword(passwordEncoder.encode(CharBuffer.wrap("ADMIN")));
            user.setName("ADMIN");
            user.setSurname("ADMIN");
            user.setPhoneNumber("123456789");
            user.setIsVerified(true);
            user.setIsActive(true);
            exampleUsers.add(user);

            User user1 = new User();

            //EMPLOYEE CUSTOM USER
            user1.setUserType(UserType.EMPLOYEE);
            user1.setLogin("EMPLOYEE");
            user1.setPassword(passwordEncoder.encode(CharBuffer.wrap("EMPLOYEE")));
            user1.setName("EMPLOYEE");
            user1.setSurname("EMPLOYEE");
            user1.setPhoneNumber("123456789");
            user1.setIsVerified(true);
            user1.setIsActive(true);
            exampleUsers.add(user1);

            userRepository.saveAll(exampleUsers);
        }
    }

    //do logowania
    public User findByLogin(String login) {
        return (User) userRepository.findByLogin(login).orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
    }

    public UserDto findByLoginDto(String login) {
       User user = userRepository.findByLogin(login).orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
       return userMapper.toUserDto(user);
    }

    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepository.findByLogin(credentialsDto.getLogin()).orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }
        throw new AppException("Invalid password", HttpStatus.UNAUTHORIZED);
    }

    public UserDto register(SignUpDto userDto) {

       Optional<User> optionalUser = userRepository.findByLogin(userDto.getLogin());

       if (optionalUser.isPresent()) {
           throw new AppException("User already exists", HttpStatus.CONFLICT);
       }

       User user = userMapper.signUpToUser(userDto);

       user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));

        user.setIsActive(true);
        user.setIsVerified(false);
        user.setUserType(UserType.CUSTOMER);

       User savedUser = userRepository.save(user);

       return userMapper.toUserDto(savedUser);
    }

    public UserDto registerEmployee(SignUpDto userDto) {

        Optional<User> optionalUser = userRepository.findByLogin(userDto.getLogin());

        if (optionalUser.isPresent()) {
            throw new AppException("User already exists", HttpStatus.CONFLICT);
        }

        User user = userMapper.signUpToUser(userDto);

        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));

        user.setIsActive(true);
        user.setIsVerified(true);
        user.setUserType(UserType.EMPLOYEE);

        User savedUser = userRepository.save(user);

        return userMapper.toUserDto(savedUser);
    }

    //do rejestracji
    public User registerUser(User user) {
        // You might want to encode the password here
        user.setIsActive(true);
        user.setIsVerified(true);
        user.setUserType(UserType.CUSTOMER);
        return userRepository.save(user);
    }

    public List<User> getAllEmployees() {
        return userRepository.findByUserType(UserType.EMPLOYEE);
    }

    public List<User> getActiveEmployees() {
        return userRepository.findByUserTypeAndIsActive(UserType.EMPLOYEE, true);
    }

    public User setUserInactive(Integer userId) {
        User user = getUserById(userId);
        if (user != null) {
            user.setIsActive(false);
            return saveOrUpdateUser(user);
        }
        return null;
    }
}

