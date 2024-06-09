package pl.polsl.project.restaurantmanagement.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.project.restaurantmanagement.model.OrderItem;
import pl.polsl.project.restaurantmanagement.services.OrderItemService;

import java.util.List;

@RestController
@RequestMapping("/api/orderitems")
@RequiredArgsConstructor
public class OrderItemsController {

    private final OrderItemService orderItemService;
    @GetMapping("/order/{orderId}")
    public ResponseEntity<List<OrderItem>> getOrderById(@PathVariable Integer orderId) {
        List<OrderItem> orderItems = orderItemService.findOrderItemsByOrderId(orderId);
        System.out.println("Order Items: " + orderItems);
        return new ResponseEntity<>(orderItems, HttpStatus.OK);
    }
}
