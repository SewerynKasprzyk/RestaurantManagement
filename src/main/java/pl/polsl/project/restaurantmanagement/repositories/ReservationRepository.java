package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.polsl.project.restaurantmanagement.model.Reservation;
import pl.polsl.project.restaurantmanagement.model.TableEntity;
import pl.polsl.project.restaurantmanagement.model.report.ReservationReport;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    // Define custom queries here if needed
    @Query("SELECT r.tables FROM Reservation r WHERE r.reserved = true")
    ArrayList<TableEntity> findReservedTables();

    List<Reservation> findByReservationDateBetween(LocalDate start, LocalDate end);

    @Query("SELECT r FROM Reservation r WHERE r.reservationDate BETWEEN :start AND :end")
    List<Reservation> findReservations(@Param("start") LocalDate start, @Param("end") LocalDate end);

}