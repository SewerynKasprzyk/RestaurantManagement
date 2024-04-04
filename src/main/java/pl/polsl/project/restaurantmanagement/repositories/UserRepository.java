package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.project.restaurantmanagement.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // Define custom queries here if needed
}
