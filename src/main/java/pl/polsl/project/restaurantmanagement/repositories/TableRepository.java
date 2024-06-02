package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.polsl.project.restaurantmanagement.model.TableEntity;

import java.util.ArrayList;

@Repository
public interface TableRepository extends JpaRepository<TableEntity, Integer> {
    // Define custom queries here if needed
    @Query("SELECT t FROM TableEntity t WHERE t NOT IN (SELECT r.tables FROM Reservation r WHERE r.reserved = true)")
    ArrayList<TableEntity> findAvailableTables();
}

