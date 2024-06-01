package pl.polsl.project.restaurantmanagement.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import pl.polsl.project.restaurantmanagement.model.DTO.ReservationDto;
import pl.polsl.project.restaurantmanagement.model.TableEntity;
import pl.polsl.project.restaurantmanagement.services.ReservationService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @GetMapping
    public ResponseEntity<List<ReservationDto>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations().stream().map(reservationService::toReservationDto).collect(Collectors.toList()));
    }

    @PostMapping("/add")
    public ResponseEntity<ReservationDto> addReservation(@RequestBody ReservationDto reservationDto) {
        ReservationDto savedReservationDto = reservationService.toReservationDto(reservationService.addReservation(reservationDto));
        return ResponseEntity.ok(savedReservationDto);
    }

    @GetMapping("/freeTables")
    public ResponseEntity<List<TableEntity>> getFreeTables() {
        return new ResponseEntity<>(reservationService.getFreeTables(), HttpStatus.OK);
    }
}
