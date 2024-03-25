package pl.polsl.project.restaurantmanagement.model;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = " ")
@Data
public class TimeSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = " ")
    private Integer timeScheduleId;

    @Enumerated(EnumType.STRING)
    @Column(name = " ")
    private Day day;

    @Column(name = " ")
    private String hour;

    @Column(name = " ")
    private Boolean isActive;

    public enum Day {
        // Define your enum values here
    }
}