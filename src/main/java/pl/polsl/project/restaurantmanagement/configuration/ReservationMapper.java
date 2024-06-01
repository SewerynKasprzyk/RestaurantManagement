package pl.polsl.project.restaurantmanagement.configuration;

import org.mapstruct.Mapper;
import pl.polsl.project.restaurantmanagement.model.DTO.ReservationDto;
import pl.polsl.project.restaurantmanagement.model.Reservation;

@Mapper(componentModel = "spring")
public interface ReservationMapper {

    ReservationDto toReservationDto(Reservation reservation);
}
