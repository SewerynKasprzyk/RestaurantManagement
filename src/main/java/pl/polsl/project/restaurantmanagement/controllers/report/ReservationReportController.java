package pl.polsl.project.restaurantmanagement.controllers.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.project.restaurantmanagement.model.report.ReservationReport;
import pl.polsl.project.restaurantmanagement.services.ReservationService;

import java.time.ZoneId;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReservationReportController {

    private final ReservationService reservationService;

    @Autowired
    public ReservationReportController(ReservationService reservationService) { this.reservationService = reservationService; }

    @GetMapping("/reservations")
    public ResponseEntity<List<ReservationReport>> getReservationsReport(@RequestParam("start") String start, @RequestParam("end") String end) {
        Instant startInstant = Instant.parse(start);
        Instant endInstant = Instant.parse(end);
        LocalDateTime startDate = LocalDateTime.ofInstant(startInstant, ZoneId.systemDefault());
        LocalDateTime endDate = LocalDateTime.ofInstant(endInstant, ZoneId.systemDefault());
        List<ReservationReport> reservations = reservationService.getReservationsByDateRange(startDate, endDate);
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }
}