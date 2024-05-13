package pl.polsl.project.restaurantmanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import pl.polsl.project.restaurantmanagement.services.IngredientService;
import pl.polsl.project.restaurantmanagement.services.MenuItemService;
import pl.polsl.project.restaurantmanagement.services.TableService;
import pl.polsl.project.restaurantmanagement.services.UserService;

@SpringBootApplication
public class RestaurantManagementApplication {

    private final UserService userService;

    private final IngredientService ingredientService;

    private final MenuItemService menuItemService;

    private final TableService tableService;

    @Autowired
    public RestaurantManagementApplication(UserService userService, IngredientService ingredientService, MenuItemService menuItemService, TableService tableService) {
        this.userService = userService;
        this.ingredientService = ingredientService;
        this.menuItemService = menuItemService;
        this.tableService = tableService;
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

    }
}
