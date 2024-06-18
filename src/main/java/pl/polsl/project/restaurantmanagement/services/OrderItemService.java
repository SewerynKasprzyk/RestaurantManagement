package pl.polsl.project.restaurantmanagement.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.project.restaurantmanagement.model.OrderItem;
import pl.polsl.project.restaurantmanagement.model.report.SalesByCategoryReport;
import pl.polsl.project.restaurantmanagement.repositories.OrderItemRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;
    private static final Logger logger = LoggerFactory.getLogger(OrderItemService.class);


    @Autowired
    public OrderItemService(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    public OrderItem saveOrUpdateOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    public OrderItem getOrderItemById(Integer id) {
        return orderItemRepository.findById(id).orElse(null);
    }

    public void deleteOrderItem(Integer id) {
        orderItemRepository.deleteById(id);
    }

    public List<SalesByCategoryReport> findSalesByCategoryReport(LocalDate start, LocalDate end, String startHour, String endHour) {
        // Konwersja godzin na typ LocalTime
        LocalTime startTime = LocalTime.parse(startHour);
        LocalTime endTime = LocalTime.parse(endHour);

        List<OrderItem> orderItems = StreamSupport
                .stream(orderItemRepository.findAll().spliterator(), false)
                .filter(orderItem ->
                        orderItem.getOrder().getOrderDate().compareTo(start) >= 0 &&
                                orderItem.getOrder().getOrderDate().compareTo(end) <= 0 &&
                                orderItem.getOrder().getOrderTime().compareTo(startTime) >= 0 &&
                                orderItem.getOrder().getOrderTime().compareTo(endTime) <= 0)
                .collect(Collectors.toList());

        Map<String, Map<String, SalesByCategoryReport>> reportMap = new HashMap<>();

        for (OrderItem orderItem : orderItems) {
            String category = orderItem.getMenuItem().getCategory().name();
            double sales = orderItem.getQuantity() * orderItem.getPrice().doubleValue();
            String orderDate = orderItem.getOrder().getOrderDate().toString();

            Map<String, SalesByCategoryReport> dateMap = reportMap.getOrDefault(category, new HashMap<>());
            SalesByCategoryReport report = dateMap.getOrDefault(orderDate, new SalesByCategoryReport(category));
            report.addSale(sales);
            report.setDay(orderDate);
            dateMap.put(orderDate, report);
            reportMap.put(category, dateMap);
        }

        return reportMap.values().stream()
                .flatMap(dateMap -> dateMap.values().stream())
                .collect(Collectors.toList());
    }


    public List<OrderItem> getOrderItemsByOrderId(Integer orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }

    public List<OrderItem> getOrderItemsByOrderIdAndCategory(Integer orderId, String category) {
        // Zwróć pozycje zamówienia, które pasują do podanego id zamówienia i kategorii
        return orderItemRepository.findAll().stream()
                .filter(orderItem -> orderItem.getOrder() != null && orderItem.getOrder().getId().equals(orderId))
                .filter(orderItem -> orderItem.getMenuItem().getCategory().name().equals(category))
                .collect(Collectors.toList());
    }

    public List<OrderItem> findOrderItemsByOrderId(Integer orderId) {
        return orderItemRepository.findOrderItemsByOrderId(orderId);
    }
}
