package pl.polsl.project.restaurantmanagement.model.DTO;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class OrderItemDto {
    private Integer menuItemId;
    private Integer quantity;
}
