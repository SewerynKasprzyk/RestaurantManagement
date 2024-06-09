package pl.polsl.project.restaurantmanagement;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import pl.polsl.project.restaurantmanagement.model.Reservation;
import pl.polsl.project.restaurantmanagement.services.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;

@SpringBootApplication
@ComponentScan(basePackages = {"pl.polsl.project.restaurantmanagement", "pl.polsl.project.restaurantmanagement.configuration"})
@EnableAutoConfiguration(exclude = {SecurityAutoConfiguration.class})
@RequiredArgsConstructor
public class RestaurantManagementApplication {

    private final UserService userService;
    private final IngredientService ingredientService;
    private final MenuItemService menuItemService;
    private final TableService tableService;
    private final ReservationService reservationService;
    private final OrderService orderService;

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(RestaurantManagementApplication.class, args);

        // Get an instance of RestaurantManagementApplication from the Spring context
        RestaurantManagementApplication app = context.getBean(RestaurantManagementApplication.class);

        // Call the initializeExampleUsers() method from the injected UserService
        app.userService.initializeExampleUsers();

        // Dodawanie przykładowych składników
        app.ingredientService.initializeExampleIngredients();

        //Dodawanie przykładowych pozycji menu
        app.menuItemService.initializeExampleMenuItems();

        //Dodawanie przykładowych stolikow
        app.tableService.initializeExampleTables();

        //Dawanie nowej rezerwacji TODO Zrobić coś z subListem
        app.reservationService.initializeExampleReservations();

        //Basic ordery
        app.orderService.initializeExampleOrders();
    }
}
