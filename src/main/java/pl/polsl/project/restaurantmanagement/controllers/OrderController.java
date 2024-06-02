package pl.polsl.project.restaurantmanagement.controllers;

import org.springframework.format.annotation.DateTimeFormat;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.project.restaurantmanagement.model.Order;
import pl.polsl.project.restaurantmanagement.model.OrderItem;
import pl.polsl.project.restaurantmanagement.model.report.SalesByCategoryReport;
import pl.polsl.project.restaurantmanagement.services.OrderService;
import pl.polsl.project.restaurantmanagement.services.OrderItemService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final OrderItemService orderItemService;

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() { return new ResponseEntity<List<Order>>(orderService.getAllOrders(), HttpStatus.OK); }

    @GetMapping("/reports/sales-by-category")
    public ResponseEntity<List<SalesByCategoryReport>> getSalesByCategoryReport(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        List<Order> orders = orderService.getOrdersByDateRange(start, end);
        Map<String, SalesByCategoryReport> reportMap = new HashMap<>();

        for (Order order : orders) {
            List<OrderItem> orderItems = orderItemService.getOrderItemsByOrderId(order.getId());

            for (OrderItem orderItem : orderItems) {
                String category = orderItem.getMenuItem().getCategory().name();
                SalesByCategoryReport report = reportMap.getOrDefault(category, new SalesByCategoryReport(category));
                report.addSale(orderItem.getPrice().doubleValue());
                reportMap.put(category, report);
            }
        }

        List<SalesByCategoryReport> reports = new ArrayList<>(reportMap.values());
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

}