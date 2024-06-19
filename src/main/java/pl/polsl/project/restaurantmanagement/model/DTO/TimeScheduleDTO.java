package pl.polsl.project.restaurantmanagement.model.DTO;

import lombok.*;
import pl.polsl.project.restaurantmanagement.model.DayOfWeek;
import java.time.LocalTime;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class TimeScheduleDTO {

    private Integer id;
    private Integer userId;  // Assuming you want to expose the user id
    @Getter
    private DayOfWeek day;
    private LocalTime startHour;
    private LocalTime endHour;
    private Boolean isActive;

    // Constructors, getters, and setters

}
