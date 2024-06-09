package pl.polsl.project.restaurantmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.project.restaurantmanagement.model.MenuItem;
import pl.polsl.project.restaurantmanagement.model.Order;
import pl.polsl.project.restaurantmanagement.model.OrderItem;
import pl.polsl.project.restaurantmanagement.repositories.MenuItemRepository;
import pl.polsl.project.restaurantmanagement.repositories.OrderItemRepository;
import pl.polsl.project.restaurantmanagement.repositories.OrderRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order saveOrUpdateOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Integer id) {
        return orderRepository.findById(id).orElse(null);
    }

    public void deleteOrder(Integer id) {
        orderRepository.deleteById(id);
    }

    public List<Order> getOrdersByDateRangeAndTimeRange(LocalDate start, LocalDate end, String startHour, String endHour) {
        // Konwersja godzin na typ LocalTime
        LocalTime startTime = LocalTime.parse(startHour);
        LocalTime endTime = LocalTime.parse(endHour);

        // Zwróć zamówienia, które pasują do podanego zakresu dat i godzin
        return orderRepository.findAll().stream()
                .filter(order -> order.getUser() != null && order.getUser().getReservations() != null)
                .filter(order -> order.getUser().getReservations().stream().anyMatch(reservation ->
                        !reservation.getReservationDate().isBefore(start) &&
                                !reservation.getReservationDate().isAfter(end) &&
                                !reservation.getStartHour().isBefore(startTime) &&
                                !reservation.getEndHour().isAfter(endTime)))
                .collect(Collectors.toList());
    }

    public void initializeExampleOrders() {
        if (orderRepository.count() == 0) {
            List<MenuItem> menuItems = menuItemRepository.findAll();

            for (int i = 0; i < 6; i++) {
                Order order = new Order();
                order.setOrderDate(LocalDate.now().minusDays(i));
                //order.setOrderTime(LocalTime.NOON.plusHours(i)); // Dodajemy różne godziny do zamówień
                orderRepository.save(order);

                for (MenuItem menuItem : menuItems) {
                    OrderItem orderItem = new OrderItem();
                    orderItem.setOrder(order);
                    orderItem.setMenuItem(menuItem);
                    orderItem.setQuantity(i + 1);
                    orderItemRepository.save(orderItem);
                }
            }
        }
    }

}

