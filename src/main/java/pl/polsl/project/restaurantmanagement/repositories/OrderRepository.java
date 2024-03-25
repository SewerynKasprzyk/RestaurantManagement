package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.polsl.project.restaurantmanagement.model.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
}