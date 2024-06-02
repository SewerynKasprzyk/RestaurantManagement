package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.polsl.project.restaurantmanagement.model.Reservation;
import pl.polsl.project.restaurantmanagement.model.TableEntity;

import java.util.ArrayList;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    // Define custom queries here if needed
    @Query("SELECT r.tables FROM Reservation r WHERE r.reserved = true")
    ArrayList<TableEntity> findReservedTables();

    @Query(value = "SELECT * FROM Reservations WHERE user_id = :userId", nativeQuery = true)
    ArrayList<Reservation> findByUserId(@Param("userId") Integer userId);
}