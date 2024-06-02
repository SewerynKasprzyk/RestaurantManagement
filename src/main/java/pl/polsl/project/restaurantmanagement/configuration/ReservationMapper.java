package pl.polsl.project.restaurantmanagement.configuration;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.polsl.project.restaurantmanagement.model.DTO.ReservationDto;
import pl.polsl.project.restaurantmanagement.model.Reservation;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ReservationMapper {

    @Mapping(source = "user", target = "user")
    ReservationDto toReservationDto(Reservation reservation);

    @Mapping(source = "user", target = "user")
    Reservation toReservation(ReservationDto reservationDto);
}
