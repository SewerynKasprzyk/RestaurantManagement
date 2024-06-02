package pl.polsl.project.restaurantmanagement.services.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.project.restaurantmanagement.model.Order;
import pl.polsl.project.restaurantmanagement.model.OrderItem;
import pl.polsl.project.restaurantmanagement.model.report.SalesByCategoryReport;
import pl.polsl.project.restaurantmanagement.services.OrderItemService;
import pl.polsl.project.restaurantmanagement.services.OrderService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {

    private final OrderService orderService;
    private final OrderItemService orderItemService;

    @Autowired
    public ReportService(OrderService orderService, OrderItemService orderItemService) {
        this.orderService = orderService;
        this.orderItemService = orderItemService;
    }

    public List<SalesByCategoryReport> getSalesByCategoryReport(LocalDate start, LocalDate end) {
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

        return new ArrayList<>(reportMap.values());
    }
}