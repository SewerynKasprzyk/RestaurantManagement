package pl.polsl.project.restaurantmanagement.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import pl.polsl.project.restaurantmanagement.model.DTO.ReservationDto;
import pl.polsl.project.restaurantmanagement.model.Reservation;
import pl.polsl.project.restaurantmanagement.model.TableEntity;
import pl.polsl.project.restaurantmanagement.services.ReservationService;
import pl.polsl.project.restaurantmanagement.configuration.ReservationMapper;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reservations")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    @Autowired
    private ReservationMapper reservationMapper;

    @GetMapping
    public ResponseEntity<List<ReservationDto>> getAllReservations() {
        return ResponseEntity.ok(reservationService.getAllReservations().stream().map(reservationService::toReservationDto).collect(Collectors.toList()));
    }

    @PostMapping("/add")
    public ResponseEntity<ReservationDto> addReservation(@RequestBody ReservationDto reservationDto, @RequestHeader("Authorization") String token) {
        Reservation reservation = reservationMapper.toReservation(reservationDto);
        Reservation savedReservation = reservationService.saveOrUpdateReservation(reservation);
        ReservationDto savedReservationDto = reservationMapper.toReservationDto(savedReservation);
        return ResponseEntity.ok(savedReservationDto);
    }

    @GetMapping("/freeTables")
    public ResponseEntity<List<TableEntity>> getFreeTables() {
        return new ResponseEntity<>(reservationService.getFreeTables(), HttpStatus.OK);
    }
}
