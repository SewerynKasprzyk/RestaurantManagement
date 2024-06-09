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
import java.time.temporal.ChronoUnit;


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
        List<SalesByCategoryReport> reports = new ArrayList<>();

        // Generate all dates between start and end
        long numOfDaysBetween = ChronoUnit.DAYS.between(start, end);
        for (int i = 0; i <= numOfDaysBetween; i++) {
            LocalDate currentDate = start.plusDays(i);

            // Get orders for the current date
            List<Order> orders = orderService.getOrdersByDateRangeAndTimeRange(currentDate, currentDate, startHour, endHour);
            Map<String, SalesByCategoryReport> reportMap = new HashMap<>();

            for (Order order : orders) {
                List<OrderItem> orderItems = orderItemService.getOrderItemsByOrderIdAndCategory(order.getId(), category);

                for (OrderItem orderItem : orderItems) {
                    String itemCategory = orderItem.getMenuItem().getCategory().name();
                    SalesByCategoryReport report = reportMap.getOrDefault(itemCategory, new SalesByCategoryReport(itemCategory));
                    report.addSale(orderItem.getPrice().doubleValue());
                    report.setDay(currentDate.toString());
                    reportMap.put(itemCategory, report);
                }
            }

            // Add the reports for the current date to the final list
            reports.addAll(reportMap.values());
        }

        return reports;
    }
}