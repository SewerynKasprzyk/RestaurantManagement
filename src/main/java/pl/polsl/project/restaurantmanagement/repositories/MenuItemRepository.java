package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.polsl.project.restaurantmanagement.model.MenuItem;

public interface MenuItemRepository extends JpaRepository<MenuItem, Integer> {
}