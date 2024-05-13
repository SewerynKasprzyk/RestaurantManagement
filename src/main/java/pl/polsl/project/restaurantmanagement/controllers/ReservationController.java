package pl.polsl.project.restaurantmanagement.controllers;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import pl.polsl.project.restaurantmanagement.model.Reservation;
import pl.polsl.project.restaurantmanagement.model.TableEntity;
import pl.polsl.project.restaurantmanagement.services.ReservationService;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;
    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }
    @GetMapping
    public ResponseEntity<List<Reservation>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations());
    }
    @PostMapping
    public ResponseEntity<Reservation> addReservation (@RequestBody Reservation reservation) {
        Reservation savedReservation = reservationService.saveOrUpdateReservation(reservation);
        return ResponseEntity.ok(savedReservation);
    }
    @GetMapping("/freeTables")
    public ResponseEntity<List<TableEntity>> getFreeTables() {
        return new ResponseEntity<>(reservationService.getFreeTables(), HttpStatus.OK);
    }
}