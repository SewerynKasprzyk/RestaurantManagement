package pl.polsl.project.restaurantmanagement.controllers;

import org.springframework.format.annotation.DateTimeFormat;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.project.restaurantmanagement.configuration.OrderMapper;
import pl.polsl.project.restaurantmanagement.model.DTO.OrderDto;
import pl.polsl.project.restaurantmanagement.model.DTO.OrderItemDto;
import pl.polsl.project.restaurantmanagement.model.Order;
import pl.polsl.project.restaurantmanagement.model.OrderItem;
import pl.polsl.project.restaurantmanagement.model.User;
import pl.polsl.project.restaurantmanagement.model.report.SalesByCategoryReport;
import pl.polsl.project.restaurantmanagement.repositories.MenuItemRepository;
import pl.polsl.project.restaurantmanagement.services.OrderService;
import pl.polsl.project.restaurantmanagement.services.OrderItemService;
import pl.polsl.project.restaurantmanagement.services.UserService;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final UserService userService;
    private final OrderItemService orderItemService;
    private final OrderMapper orderMapper;
    private final MenuItemRepository menuItemRepository;

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);


    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() { return new ResponseEntity<List<Order>>(orderService.getAllOrders(), HttpStatus.OK); }

    @GetMapping("/kitchen")
    public ResponseEntity<List<Order>> getUnservedOrders() {
        return new ResponseEntity<List<Order>>(orderService.getUnservedOrders(), HttpStatus.OK);
    }

//    @GetMapping("/reports/sales-by-category")
//    public ResponseEntity<List<SalesByCategoryReport>> getSalesByCategoryReport(
//            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
//            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end,
//            @RequestParam("startHour") String startHour,
//            @RequestParam("endHour") String endHour) {
//        List<SalesByCategoryReport> reports = orderItemService.findSalesByCategoryReport(start, end, startHour, endHour);
//        return new ResponseEntity<>(reports, HttpStatus.OK);
//    }

    @GetMapping("user/{userId}")
    public ResponseEntity<List<Order>> getOrdersByUserId(@PathVariable Integer userId) {
        return new ResponseEntity<List<Order>>(orderService.getOrdersByUserId(userId), HttpStatus.OK);
    }

    @PostMapping("/{orderId}")
    public ResponseEntity<Order> markOrderAsServed(@PathVariable Integer orderId) {
        Order updatedOrder = orderService.markAsServed(orderId);
        if (updatedOrder != null) {
            return ResponseEntity.ok(updatedOrder);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<OrderDto> addOrder(@RequestBody OrderDto orderDTO, @RequestHeader("Authorization") String token) {
        System.out.println("Received OrderDTO: " + orderDTO);

        // Mapowanie OrderDto na Order
        Order order = orderMapper.toOrder(orderDTO);

        // Ustawienie daty zamówienia
        order.setOrderDate(LocalDate.now());

        // Ustawienie użytkownika
        User user = userService.getUserById(orderDTO.getUserId());
        order.setUser(user);

        order.setOrderTime(LocalTime.now().withNano(0));

        // Tworzenie listy OrderItem
        List<OrderItem> orderItems = new ArrayList<>();
        for (OrderItemDto orderItemDto : orderDTO.getOrderItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setMenuItem(menuItemRepository.findById(orderItemDto.getMenuItemId()).orElse(null)); // Ustawienie MenuItem
            orderItem.setQuantity(orderItemDto.getQuantity());
            orderItem.setOrder(order);
            orderItems.add(orderItem);
        }

        // Ustawienie listy OrderItem w zamówieniu
        order.setOrderItems(orderItems);

        // Ustawienie statusu zamowienia
        order.setIsServed(false);

        // Zapis zamówienia
        Order savedOrder = orderService.addOrder(order);

        // Mapowanie Order na OrderDto
        OrderDto savedOrderDto = orderMapper.toOrderDto(savedOrder);

        return ResponseEntity.ok(savedOrderDto);
    }

}