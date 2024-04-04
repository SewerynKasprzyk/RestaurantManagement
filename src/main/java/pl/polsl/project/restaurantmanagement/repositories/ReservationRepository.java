package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.project.restaurantmanagement.model.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    // Define custom queries here if needed
}