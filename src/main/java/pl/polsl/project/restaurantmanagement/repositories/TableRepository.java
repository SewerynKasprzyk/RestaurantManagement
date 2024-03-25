package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.polsl.project.restaurantmanagement.model.Table_entity;

public interface TableRepository extends JpaRepository<Table_entity, Integer> {
}