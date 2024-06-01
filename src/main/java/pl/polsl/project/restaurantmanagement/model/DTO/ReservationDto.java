package pl.polsl.project.restaurantmanagement.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.polsl.project.restaurantmanagement.model.TableEntity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ReservationDto {

    private Integer id;
    private LocalDate reservationDate;
    private LocalTime startHour;
    private LocalTime endHour;
    private Boolean reserved;
    private String notes;
    private UserDto user;
    private List<TableEntity> tables;

}
