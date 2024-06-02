package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.polsl.project.restaurantmanagement.model.Reservation;
import pl.polsl.project.restaurantmanagement.model.TableEntity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    // Define custom queries here if needed
    @Query("SELECT r.tables FROM Reservation r WHERE r.startHour < :endTime AND r.endHour > :startTime")
    List<TableEntity> findReservedTables(@Param("startTime") LocalTime startTime, @Param("endTime") LocalTime endTime);

    @Query(value = "SELECT * FROM Reservations WHERE user_id = :userId", nativeQuery = true)
    ArrayList<Reservation> findByUserId(@Param("userId") Integer userId);

    @Query(value = "SELECT * FROM Reservations WHERE table_id = :id", nativeQuery = true)
    List<Reservation> findByTablesId(Integer id);

    @Query("SELECT r FROM Reservation r WHERE r.reservationDate = :reservationDate AND ((r.startHour < :endHour AND r.endHour > :startHour))")
    List<Reservation> findConflictingReservations(@Param("reservationDate") LocalDate reservationDate, @Param("startHour") LocalTime startHour, @Param("endHour") LocalTime endHour);

}