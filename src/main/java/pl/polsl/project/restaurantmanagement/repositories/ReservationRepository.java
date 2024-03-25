package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.polsl.project.restaurantmanagement.model.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
}