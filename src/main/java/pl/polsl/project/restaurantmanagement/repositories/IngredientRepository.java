package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.project.restaurantmanagement.model.Ingredient;

@Repository
public interface IngredientRepository extends JpaRepository<Ingredient, Integer> {
    // Define custom queries here if needed
}
