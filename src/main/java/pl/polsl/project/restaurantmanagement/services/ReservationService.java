package pl.polsl.project.restaurantmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.project.restaurantmanagement.model.Reservation;
import pl.polsl.project.restaurantmanagement.model.report.ReservationReport;
import pl.polsl.project.restaurantmanagement.repositories.ReservationRepository;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    public Reservation saveOrUpdateReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public List<ReservationReport> getReservationsByDateRange(LocalDateTime start, LocalDateTime end) {
        List<Reservation> reservations = reservationRepository.findByReservationDateBetween(start.toLocalDate(), end.toLocalDate());

        Map<LocalDate, List<Reservation>> groupedReservations = reservations.stream()
                .collect(Collectors.groupingBy(Reservation::getReservationDate));

        List<ReservationReport> reports = new ArrayList<>();

        for (Map.Entry<LocalDate, List<Reservation>> entry : groupedReservations.entrySet()) {
            LocalDate date = entry.getKey();
            List<Reservation> dateReservations = entry.getValue();

            long totalMinutes = dateReservations.stream()
                    .mapToLong(reservation -> Duration.between(reservation.getStartHour(), reservation.getEndHour()).toMinutes())
                    .sum();

            long averageMinutes = totalMinutes / dateReservations.size();
            long hours = averageMinutes / 60;
            long minutes = averageMinutes % 60;

            String averageHours = hours + "h " + minutes + "min";

            reports.add(new ReservationReport(date, dateReservations.size(), averageHours));
        }

        return reports;
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation getReservationById(Integer id) {
        return reservationRepository.findById(id).orElse(null);
    }

    public void deleteReservation(Integer id) {
        reservationRepository.deleteById(id);
    }
}