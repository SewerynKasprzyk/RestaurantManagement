package pl.polsl.project.restaurantmanagement.controllers;

import org.springframework.format.annotation.DateTimeFormat;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.project.restaurantmanagement.configuration.OrderItemMapper;
import pl.polsl.project.restaurantmanagement.configuration.OrderMapper;
import pl.polsl.project.restaurantmanagement.model.DTO.OrderDto;
import pl.polsl.project.restaurantmanagement.model.DTO.OrderItemDto;
import pl.polsl.project.restaurantmanagement.model.Order;
import pl.polsl.project.restaurantmanagement.model.OrderItem;
import pl.polsl.project.restaurantmanagement.model.report.SalesByCategoryReport;
import pl.polsl.project.restaurantmanagement.services.OrderService;
import pl.polsl.project.restaurantmanagement.services.OrderItemService;
import pl.polsl.project.restaurantmanagement.services.UserService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final OrderItemService orderItemService;
    private final OrderMapper orderMapper;
    private final OrderItemMapper orderItemMapper;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() { return new ResponseEntity<List<Order>>(orderService.getAllOrders(), HttpStatus.OK); }

    @GetMapping("/reports/sales-by-category")
    public ResponseEntity<List<SalesByCategoryReport>> getSalesByCategoryReport(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        List<SalesByCategoryReport> reports = orderItemService.findSalesByCategoryReport(start, end);
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    @GetMapping("user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable Integer userId) {
        return new ResponseEntity<List<Order>>(orderService.getOrdersByUserId(userId), HttpStatus.OK);
    }


    @PostMapping("/add")
    public ResponseEntity<OrderDto> addOrder(@RequestBody OrderDto orderDTO, @RequestHeader("Authorization") String token) {
        System.out.println("Received OrderDTO: " + orderDTO);

        // Mapowanie OrderDto na Order
        Order order = orderMapper.toOrder(orderDTO);

        // Ustawienie daty zamówienia
        order.setOrderDate(LocalDate.now());

        // Ustawienie użytkownika
        order.setUser(userService.getUserById(orderDTO.getUserId()));

        // Dodanie zamówienia
        Order savedOrder = orderService.addOrder(order);

        // Dodanie elementów zamówienia
        if (orderDTO.getOrderItems() != null) {
            for (OrderItemDto orderItemDTO : orderDTO.getOrderItems()) {
                OrderItem orderItem = orderItemMapper.toOrderItem(orderItemDTO);
                // Ustawienie zamówienia dla elementu zamówienia
                orderItem.setOrder(savedOrder);
                // Dodanie elementu zamówienia
                orderItemService.saveOrUpdateOrderItem(orderItem);
            }
        }

        // Mapowanie z powrotem na OrderDto
        OrderDto savedOrderDto = orderMapper.toOrderDto(savedOrder);

        return ResponseEntity.ok(savedOrderDto);
    }

}