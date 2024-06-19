package pl.polsl.project.restaurantmanagement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.time.LocalTime;

@Entity
@Table(name = "time_schedule")
@Data
@NoArgsConstructor
public class TimeSchedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "time_schedule_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonManagedReference // This manages the serialization direction
    @JsonIgnore
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(name = "day")
    private DayOfWeek day;

    @Column(name = "start_hour")
    private LocalTime startHour;

    @Column(name = "end_hour")
    private LocalTime endHour;

    @Column(name = "is_active")
    private Boolean isActive = true;

    // Constructors, getters, and setters
}
