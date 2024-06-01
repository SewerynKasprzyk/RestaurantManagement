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
import pl.polsl.project.restaurantmanagement.repositories.ReservationRepository;
import pl.polsl.project.restaurantmanagement.repositories.TableRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

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

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Reservation getReservationById(Integer id) {
        return reservationRepository.findById(id).orElse(null);
    }

    public void deleteReservation(Integer id) {
        reservationRepository.deleteById(id);
    }

    public List<TableEntity> getFreeTables() {
        return tableRepository.findAvailableTables();
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
