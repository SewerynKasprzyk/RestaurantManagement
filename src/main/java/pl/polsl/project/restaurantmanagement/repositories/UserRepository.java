package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.project.restaurantmanagement.model.User;
import pl.polsl.project.restaurantmanagement.model.UserType;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // Define custom queries here if needed
    Optional<User> findByLogin(String login);

    // Custom query to find users by type
    List<User> findByUserType(UserType userType);

    List<User> findByUserTypeAndIsActive(UserType userType, Boolean isActive);
}
