package pl.polsl.project.restaurantmanagement.services.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.project.restaurantmanagement.model.Order;
import pl.polsl.project.restaurantmanagement.model.OrderItem;
import pl.polsl.project.restaurantmanagement.model.report.SalesByCategoryReport;
import pl.polsl.project.restaurantmanagement.services.OrderItemService;
import pl.polsl.project.restaurantmanagement.services.OrderService;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;


@Service
public class ReportService {

    private final OrderService orderService;
    private final OrderItemService orderItemService;

    @Autowired
    public ReportService(OrderService orderService, OrderItemService orderItemService) {
        this.orderService = orderService;
        this.orderItemService = orderItemService;
    }

    public List<SalesByCategoryReport> getSalesByCategoryReport(LocalDate start, LocalDate end, String category, String startHour, String endHour) {
        // Konwersja godzin na typ LocalTime
        LocalTime startTime = LocalTime.parse(startHour);
        LocalTime endTime = LocalTime.parse(endHour);

        // Pobranie wszystkich zamówień
        List<Order> orders = orderService.getAllOrders();

        // Filtracja zamówień, które pasują do podanego zakresu dat i godzin
        List<Order> filteredOrders = orders.stream()
                .filter(order -> !order.getOrderDate().isBefore(start) && !order.getOrderDate().isAfter(end) &&
                        !order.getOrderTime().isBefore(startTime) && !order.getOrderTime().isAfter(endTime))
                .collect(Collectors.toList());

        Map<String, Map<String, SalesByCategoryReport>> reportMap = new HashMap<>();

        for (Order order : filteredOrders) {
            for (OrderItem orderItem : order.getOrderItems()) {
                String itemCategory = orderItem.getMenuItem().getCategory().name();
                if (!itemCategory.equals(category)) {
                    continue;
                }
                double sales = orderItem.getQuantity() * orderItem.getPrice().doubleValue();
                String orderDate = order.getOrderDate().toString();

                Map<String, SalesByCategoryReport> dateMap = reportMap.getOrDefault(itemCategory, new HashMap<>());
                SalesByCategoryReport report = dateMap.getOrDefault(orderDate, new SalesByCategoryReport(itemCategory));
                report.addSale(sales);
                report.setDay(orderDate);
                dateMap.put(orderDate, report);
                reportMap.put(itemCategory, dateMap);
            }
        }

        return reportMap.values().stream()
                .flatMap(dateMap -> dateMap.values().stream())
                .collect(Collectors.toList());
    }
}