package pl.polsl.project.restaurantmanagement.configuration;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.polsl.project.restaurantmanagement.model.DTO.OrderItemDto;
import pl.polsl.project.restaurantmanagement.model.OrderItem;

@Mapper
public interface OrderItemMapper {

    OrderItemMapper INSTANCE = Mappers.getMapper(OrderItemMapper.class);
    @Mapping(target = "id", ignore = true) // Ignorujemy pole id, ponieważ zostanie nadane automatycznie przez bazę danych
    @Mapping(target = "order", ignore = true) // Ignorujemy pole order, zostanie ustawione w kontrolerze
    OrderItem toOrderItem(OrderItemDto orderItemDto);
}

