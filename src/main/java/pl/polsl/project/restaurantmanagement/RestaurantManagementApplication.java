package pl.polsl.project.restaurantmanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import pl.polsl.project.restaurantmanagement.model.Reservation;
import pl.polsl.project.restaurantmanagement.services.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Collections;

@SpringBootApplication
public class RestaurantManagementApplication {

    private final UserService userService;

    private final IngredientService ingredientService;

    private final MenuItemService menuItemService;

    private final TableService tableService;
    private final ReservationService reservationService;

    @Autowired
    public RestaurantManagementApplication(UserService userService, IngredientService ingredientService,
                                           MenuItemService menuItemService, TableService tableService,
                                           ReservationService reservationService) {
        this.userService = userService;
        this.ingredientService = ingredientService;
        this.menuItemService = menuItemService;
        this.tableService = tableService;
        this.reservationService = reservationService;
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
        app.reservationService.saveOrUpdateReservation(new Reservation(LocalDate.now(), LocalTime.of(12, 0),
                LocalTime.of(14, 0), true, "Brak uwag", app.userService.getUserById(1),
                Collections.singletonList(app.tableService.getTableById(1))));

    }
}
