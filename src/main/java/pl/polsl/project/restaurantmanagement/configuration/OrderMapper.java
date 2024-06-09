package pl.polsl.project.restaurantmanagement.configuration;

import org.mapstruct.Mapper;
import pl.polsl.project.restaurantmanagement.model.DTO.OrderDto;
import pl.polsl.project.restaurantmanagement.model.Order;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface OrderMapper {
    OrderDto toOrderDto(Order order);
    Order toOrder(OrderDto orderDto);
}
