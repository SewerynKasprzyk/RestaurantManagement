package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.project.restaurantmanagement.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    // Define custom queries here if needed
}
