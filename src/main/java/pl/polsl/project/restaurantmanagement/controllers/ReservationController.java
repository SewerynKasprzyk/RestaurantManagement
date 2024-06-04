package pl.polsl.project.restaurantmanagement.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import pl.polsl.project.restaurantmanagement.model.DTO.ReservationDto;
import pl.polsl.project.restaurantmanagement.model.MenuItemType;
import pl.polsl.project.restaurantmanagement.model.Reservation;
import pl.polsl.project.restaurantmanagement.model.TableEntity;
import pl.polsl.project.restaurantmanagement.model.report.ReservationReport;
import pl.polsl.project.restaurantmanagement.services.ReservationService;
import pl.polsl.project.restaurantmanagement.configuration.ReservationMapper;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Arrays;
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

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReservationDto>> getReservationsByUserId(@PathVariable Integer userId) {
        List<ReservationDto> reservations = reservationService.getReservationsByUserId(userId);
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/tables/{id}")
    public ResponseEntity<List<ReservationDto>> getReservationsByTableId(@PathVariable Integer id) {
        List<ReservationDto> reservations = reservationService.getReservationsByTableId(id);
        return ResponseEntity.ok(reservations);
    }


    @PostMapping("/add")
    public ResponseEntity<ReservationDto> addReservation(@RequestBody ReservationDto reservationDto, @RequestHeader("Authorization") String token) {
        Reservation reservation = reservationMapper.toReservation(reservationDto);
        Reservation savedReservation = reservationService.saveOrUpdateReservation(reservation);
        ReservationDto savedReservationDto = reservationMapper.toReservationDto(savedReservation);
        return ResponseEntity.ok(savedReservationDto);
    }

    @GetMapping("/freeTables")
    public ResponseEntity<List<TableEntity>> getFreeTables(@RequestParam("reservationDate") String reservationDate,
                                                           @RequestParam("startHour") String startHour,
                                                           @RequestParam("endHour") String endHour) {
        LocalDate date = LocalDate.parse(reservationDate);
        LocalTime start = LocalTime.parse(startHour);
        LocalTime end = LocalTime.parse(endHour);

        List<TableEntity> freeTables = reservationService.getFreeTables(date, start, end);
        return new ResponseEntity<>(freeTables, HttpStatus.OK);
    }

    // Nowa metoda
    @GetMapping("/reports/reservations")
    public ResponseEntity<List<ReservationReport>> getReservationsReport(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        List<ReservationReport> reports = reservationService.findReservationsReport(start, end);
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReservationDto> getReservationById(@PathVariable Integer id) {
        Reservation existingReservation = reservationService.getReservationById(id);
        if (existingReservation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(reservationMapper.toReservationDto(existingReservation), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReservationDto> updateReservation(@PathVariable Integer id, @RequestBody ReservationDto reservationDto) {
        Reservation existingReservation = reservationService.getReservationById(id);
        if (existingReservation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Reservation updatedReservation = reservationMapper.toReservation(reservationDto);
        updatedReservation.setId(id);
        reservationService.saveOrUpdateReservation(updatedReservation);
        return new ResponseEntity<>(reservationMapper.toReservationDto(updatedReservation), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable Integer id) {
        Reservation existingReservation = reservationService.getReservationById(id);
        if (existingReservation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        reservationService.deleteReservation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //obłożenie stolików
    @GetMapping("/reservedTables")
    public ResponseEntity<List<TableEntity>> getReservedTables() {
        LocalDate date = LocalDate.now();
        LocalTime start = LocalTime.now();
        LocalTime end = LocalTime.now().plusMinutes(20);

        List<TableEntity> freeTables = reservationService.getReservedTables(date, start, end);
        return new ResponseEntity<>(freeTables, HttpStatus.OK);
    }

    @GetMapping("/reservations/{date}")
    public ResponseEntity<List<ReservationDto>> getReservationsForDate(@PathVariable String date) {
        LocalDate selectedDate = LocalDate.parse(date);
        List<ReservationDto> reservations = reservationService.getReservationsByDate(selectedDate);
        return ResponseEntity.ok(reservations);
    }
}
