package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.polsl.project.restaurantmanagement.model.Table;

public interface TableRepository extends JpaRepository<Table, Integer> {
}