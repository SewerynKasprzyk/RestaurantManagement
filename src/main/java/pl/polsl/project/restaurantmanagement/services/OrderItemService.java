package pl.polsl.project.restaurantmanagement.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.project.restaurantmanagement.model.OrderItem;
import pl.polsl.project.restaurantmanagement.model.report.SalesByCategoryReport;
import pl.polsl.project.restaurantmanagement.repositories.OrderItemRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;

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

    public List<SalesByCategoryReport> findSalesByCategoryReport(LocalDate start, LocalDate end) {
        return orderItemRepository.findSalesByCategoryReport(start, end).stream()
                .map(report -> {
                    report.setAverageOrderValue(report.getTotalSales() / report.getOrderCount());
                    return report;
                })
                .collect(Collectors.toList());
    }

    public List<OrderItem> getOrderItemsByOrderIdAndCategory(Integer orderId, String category) {
        // Zwróć pozycje zamówienia, które pasują do podanego id zamówienia i kategorii
        return orderItemRepository.findAll().stream()
                .filter(orderItem -> orderItem.getOrder() != null && orderItem.getOrder().getId().equals(orderId))
                .filter(orderItem -> orderItem.getMenuItem().getCategory().name().equals(category))
                .collect(Collectors.toList());
    }
}
