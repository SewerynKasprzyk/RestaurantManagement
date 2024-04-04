package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.project.restaurantmanagement.model.TableEntity;

@Repository
public interface TableRepository extends JpaRepository<TableEntity, Integer> {
    // Define custom queries here if needed
}

