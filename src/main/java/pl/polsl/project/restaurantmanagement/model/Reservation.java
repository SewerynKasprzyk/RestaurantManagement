package pl.polsl.project.restaurantmanagement.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Entity
@Table(name = "reservations")
@Data
@NoArgsConstructor
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reservation_id")
    private Integer id;

    @Column(name = "reservation_date")
    private LocalDate reservationDate;

    @Column(name = "start_hour")
    private LocalTime startHour;

    @Column(name = "end_hour")
    private LocalTime endHour;

    @Column(name = "is_reserved")
    private Boolean reserved;

    @Column(name = "notes")
    private String notes;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "reservation_tables",
            joinColumns = @JoinColumn(name = "reservation_id"),
            inverseJoinColumns = @JoinColumn(name = "table_id")
    )
    private List<TableEntity> tables;

    // Constructors, getters, and setters
}

