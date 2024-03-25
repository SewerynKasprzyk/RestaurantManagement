package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.polsl.project.restaurantmanagement.model.Ingredient;

public interface IngredientRepository extends JpaRepository<Ingredient, Integer> {
}