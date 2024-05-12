package pl.polsl.project.restaurantmanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.project.restaurantmanagement.model.Ingredient;
import pl.polsl.project.restaurantmanagement.services.IngredientService;

import java.util.List;

@RestController
@RequestMapping("/api/ingredient")
public class IngredientController {

    private final IngredientService ingredientService;

    @Autowired
    public IngredientController(IngredientService ingredientService) { this.ingredientService = ingredientService; }

    @GetMapping
    public ResponseEntity<List<Ingredient>> getAllIngredients() {
        return new ResponseEntity<List<Ingredient>>(ingredientService.getAllIngredients(), HttpStatus.OK);
    }

}
