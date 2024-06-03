package pl.polsl.project.restaurantmanagement.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.project.restaurantmanagement.configuration.ReservationMapper;
import pl.polsl.project.restaurantmanagement.configuration.UserAuthProvider;
import pl.polsl.project.restaurantmanagement.model.DTO.ReservationDto;
import pl.polsl.project.restaurantmanagement.model.DTO.UserDto;
import pl.polsl.project.restaurantmanagement.model.Reservation;
import pl.polsl.project.restaurantmanagement.model.TableEntity;
import pl.polsl.project.restaurantmanagement.model.User;
import pl.polsl.project.restaurantmanagement.model.report.ReservationReport;
import pl.polsl.project.restaurantmanagement.repositories.ReservationRepository;
import pl.polsl.project.restaurantmanagement.repositories.TableRepository;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    private final TableRepository tableRepository;
    private final ReservationRepository reservationRepository;
    private final UserService userService;
    private final TableService tableService;
    private final ReservationMapper reservationMapper;

    private final UserAuthProvider userAuthProvider;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, UserService userService, TableService tableService, TableRepository tableRepository, ReservationMapper reservationMapper, UserAuthProvider userAuthProvider){
        this.reservationRepository = reservationRepository;
        this.userService = userService;
        this.tableService = tableService;
        this.tableRepository = tableRepository;
        this.reservationMapper = reservationMapper;
        this.userAuthProvider = userAuthProvider;
    }

    public Reservation saveOrUpdateReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public Reservation getReservationById(Integer id) {
        return reservationRepository.findReservationById(id);
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

    // Nowa metoda
    public List<ReservationReport> findReservationsReport(LocalDate start, LocalDate end) {
        List<Reservation> reservations = reservationRepository.findReservations(start, end);

        Map<LocalDate, List<Reservation>> groupedReservations = reservations.stream()
                .collect(Collectors.groupingBy(Reservation::getReservationDate));

        List<ReservationReport> reports = new ArrayList<>();

        for (Map.Entry<LocalDate, List<Reservation>> entry : groupedReservations.entrySet()) {
            LocalDate date = entry.getKey();
            List<Reservation> dailyReservations = entry.getValue();

            double totalHours = 0;
            for (Reservation reservation : dailyReservations) {
                Duration duration = Duration.between(reservation.getStartHour(), reservation.getEndHour());
                totalHours += duration.toHours();
            }

            double averageHours = totalHours / dailyReservations.size();
            reports.add(new ReservationReport(date, dailyReservations.size(), String.format("%.2f", averageHours)));
        }

        return reports;
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public List<ReservationDto> getReservationsByUserId(Integer userId) {
        List<Reservation> reservations = reservationRepository.findByUserId(userId);
        return reservations.stream()
                .map(reservationMapper::toReservationDto)
                .collect(Collectors.toList());
    }

    public void deleteReservation(Integer id) {
        reservationRepository.deleteById(id);
    }

    public List<TableEntity> getFreeTables() {
        return tableRepository.findAvailableTables();
    }

    public List<TableEntity> getFreeTables(LocalTime startTime, LocalTime endTime) {
        List<TableEntity> allTables = tableRepository.findAll();
        List<TableEntity> reservedTables = reservationRepository.findReservedTables(startTime, endTime);
        return allTables.stream()
                .filter(table -> !reservedTables.contains(table))
                .collect(Collectors.toList());
    }

    public List<TableEntity> getFreeTables(LocalDate reservationDate, LocalTime startHour, LocalTime endHour) {
        List<TableEntity> allTables = tableRepository.findAll();
        List<Reservation> conflictingReservations = reservationRepository.findConflictingReservations(reservationDate, startHour, endHour);

        List<TableEntity> occupiedTables = new ArrayList<>();
        for (Reservation reservation : conflictingReservations) {
            occupiedTables.addAll(reservation.getTables());
        }

        return allTables.stream()
                .filter(table -> !occupiedTables.contains(table))
                .collect(Collectors.toList());
    }


    public Reservation addReservation(ReservationDto reservationDto, String token){
        UserDto userDto = userAuthProvider.getUserFromToken(token);
        User user = userService.getUserById(userDto.getId());
        Reservation reservation = reservationMapper.toReservation(reservationDto);
        reservation.setUser(user);
        return reservationRepository.save(reservation);
    }

    public ReservationDto toReservationDto(Reservation reservation){
        return reservationMapper.toReservationDto(reservation);
    }

    public List<ReservationDto> getReservationsByTableId(Integer id) {
        List<Reservation> reservations = reservationRepository.findByTablesId(id);
        return reservations.stream()
                .map(reservationMapper::toReservationDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public void initializeExampleReservations() {
        List<TableEntity> chooseTables = new ArrayList<>();
        chooseTables.add(tableService.getTableById(1));
        chooseTables.add(tableService.getTableById(2));

        List<TableEntity> chooseTables2 = new ArrayList<>();
        chooseTables2.add(tableService.getTableById(3));

        if (reservationRepository.count() == 0) {
            Reservation reservation1 = new Reservation(LocalDate.now(), LocalTime.of(12, 0), LocalTime.of(14,0), true, "Brak uwag", userService.getUserById(1), chooseTables);
            reservationRepository.save(reservation1);

            Reservation reservation2 = new Reservation(LocalDate.now(), LocalTime.of(14, 0), LocalTime.of(16,0), true, "Brak uwag", userService.getUserById(2), chooseTables2);
            reservationRepository.save(reservation2);
        }
    }

}
