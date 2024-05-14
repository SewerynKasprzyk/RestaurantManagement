package pl.polsl.project.restaurantmanagement.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.project.restaurantmanagement.model.MenuItem;
import pl.polsl.project.restaurantmanagement.model.Reservation;
import pl.polsl.project.restaurantmanagement.model.TableEntity;
import pl.polsl.project.restaurantmanagement.repositories.ReservationRepository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static pl.polsl.project.restaurantmanagement.model.MenuItemType.*;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final UserService userService;
    private final TableService tableService;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, UserService userService, TableService tableService) {
        this.reservationRepository = reservationRepository;
        this.userService = userService;
        this.tableService = tableService;
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
        List<Reservation> allReservations = reservationRepository.findAll();
        List<TableEntity> freeTables = new ArrayList<>();
        for (Reservation r : allReservations) {
            if (!r.getReserved()) {
                freeTables.addAll(r.getTables());
            }
        }
        return freeTables;
    }

    @Transactional
    public void initializeExampleReservations() {
        if (reservationRepository.count() == 0) {
            Reservation reservation1 = new Reservation(LocalDate.now(), LocalTime.of(12, 0), LocalTime.of(14,0), true, "Brak uwag", userService.getUserById(1), Collections.singletonList(tableService.getTableById(1)));
//            Reservation reservation1 = new Reservation(LocalDate.now(), LocalTime.of(12, 0), LocalTime.of(14, 0), userService.getUserById(1), Collections.singletonList(tableService.getTableById(1)));
            Reservation reservation2 = new Reservation(LocalDate.now(), LocalTime.of(14, 0), LocalTime.of(16, 0), true, "Brak uwag",  userService.getUserById(2), Collections.singletonList(tableService.getTableById(2)));
            Reservation reservation3 = new Reservation(LocalDate.now(), LocalTime.of(16, 0), LocalTime.of(18, 0), true, "Brak uwag", userService.getUserById(3), Collections.singletonList(tableService.getTableById(3)));
            Reservation reservation4 = new Reservation(LocalDate.now(), LocalTime.of(18, 0), LocalTime.of(20, 0), true, "Brak uwag",userService.getUserById(4), Collections.singletonList(tableService.getTableById(4)));
            Reservation reservation5 = new Reservation(LocalDate.now(), LocalTime.of(20, 0), LocalTime.of(22, 0),true, "Brak uwag", userService.getUserById(5), Collections.singletonList(tableService.getTableById(5)));
            reservationRepository.save(reservation1);
            reservationRepository.save(reservation2);
            reservationRepository.save(reservation3);
            reservationRepository.save(reservation4);
            reservationRepository.save(reservation5);
        }
    }
}

