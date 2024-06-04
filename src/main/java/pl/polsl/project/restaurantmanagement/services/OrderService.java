package pl.polsl.project.restaurantmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import pl.polsl.project.restaurantmanagement.model.DTO.OrderDto;
import pl.polsl.project.restaurantmanagement.model.MenuItem;
import pl.polsl.project.restaurantmanagement.model.Order;
import pl.polsl.project.restaurantmanagement.model.OrderItem;
import pl.polsl.project.restaurantmanagement.model.User;
import pl.polsl.project.restaurantmanagement.repositories.MenuItemRepository;
import pl.polsl.project.restaurantmanagement.repositories.OrderItemRepository;
import pl.polsl.project.restaurantmanagement.repositories.OrderRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    private final UserService userService;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, UserService userService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
    }

    public Order saveOrderFromDto(OrderDto orderDTO) {
        Order order = new Order();
        order.setTotalPrice(orderDTO.getTotalPrice());
        order.setNotes(orderDTO.getNotes());
        User user = userService.getUserById(orderDTO.getUserId());
        order.setUser(user);

        return orderRepository.save(order);
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

    public List<Order> getOrdersByDateRange(LocalDate start, LocalDate end) {
        return orderRepository.findByOrderDateBetween(start, end);
    }

    public Order addOrder(Order order) {

        return orderRepository.save(order);
    }
    public void initializeExampleOrders() {
        if (orderRepository.count() == 0) {
            List<MenuItem> menuItems = menuItemRepository.findAll();

            for (int i = 0; i < 6; i++) {
                Order order = new Order();
                order.setOrderDate(LocalDate.now().minusDays(i));
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

    public ArrayList<Order> getOrdersByUserId(Integer userId) {
        return orderRepository.findByUserId(userId);
    }
}

