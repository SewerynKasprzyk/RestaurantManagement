package pl.polsl.project.restaurantmanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.ConfigurableApplicationContext;
import pl.polsl.project.restaurantmanagement.services.*;

@SpringBootApplication
@EnableAutoConfiguration(exclude = {SecurityAutoConfiguration.class})
public class RestaurantManagementApplication {

    private final UserService userService;

    private final IngredientService ingredientService;

    private final MenuItemService menuItemService;

    private final TableService tableService;
    private final ReservationService reservationService;
    private final OrderService orderService;

    @Autowired
    public RestaurantManagementApplication(UserService userService, IngredientService ingredientService,
                                           MenuItemService menuItemService, TableService tableService,
                                           ReservationService reservationService, OrderService orderService) {
        this.userService = userService;
        this.ingredientService = ingredientService;
        this.menuItemService = menuItemService;
        this.tableService = tableService;
        this.reservationService = reservationService;
        this.orderService = orderService;
    }

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

        app.orderService.initializeExampleOrders();

    }
}
