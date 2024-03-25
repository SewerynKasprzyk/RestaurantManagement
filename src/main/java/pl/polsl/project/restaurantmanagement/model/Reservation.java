package pl.polsl.project.restaurantmanagement.model;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.*;
import java.util.Date;

@Entity
@Table(name = " ")
@Data
public class Reservation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = " ")
    private Integer reservationId;

    @Column(name = " ")
    private Integer tableId;

    @Column(name = " ")
    @Temporal(TemporalType.DATE)
    private Date reservationDate;

    @Column(name = " ")
    private String timeSlot;

    @Column(name = " ")
    private String notes;
}