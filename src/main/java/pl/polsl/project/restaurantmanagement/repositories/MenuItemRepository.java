package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.project.restaurantmanagement.model.MenuItem;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Integer> {
    // Define custom queries here if needed
}