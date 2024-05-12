package pl.polsl.project.restaurantmanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import pl.polsl.project.restaurantmanagement.services.IngredientService;
import pl.polsl.project.restaurantmanagement.services.UserService;

@SpringBootApplication
public class RestaurantManagementApplication {

    private final UserService userService;

    private final IngredientService ingredientService;

    @Autowired
    public RestaurantManagementApplication(UserService userService, IngredientService ingredientService) {
        this.userService = userService;
        this.ingredientService = ingredientService;
    }

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(RestaurantManagementApplication.class, args);

        // Get an instance of RestaurantManagementApplication from the Spring context
        RestaurantManagementApplication app = context.getBean(RestaurantManagementApplication.class);

        // Call the initializeExampleUsers() method from the injected UserService
        app.userService.initializeExampleUsers();

        // Dodawanie przykładowych składników
        app.ingredientService.initializeExampleIngredients();

    }
}
