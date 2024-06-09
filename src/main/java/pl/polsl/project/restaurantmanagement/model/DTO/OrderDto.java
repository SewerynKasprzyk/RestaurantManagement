package pl.polsl.project.restaurantmanagement.model.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;
import pl.polsl.project.restaurantmanagement.model.OrderItem;

import java.util.ArrayList;
import java.util.List;


@Data
@NoArgsConstructor
public class OrderDto {

    private double totalPrice;
    private String notes;

    private Integer userId;
    private List<OrderItemDto> orderItems;

    // Getters and setters
}
