package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.polsl.project.restaurantmanagement.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
}