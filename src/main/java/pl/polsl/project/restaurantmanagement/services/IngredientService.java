package pl.polsl.project.restaurantmanagement.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.project.restaurantmanagement.model.AmountType;
import pl.polsl.project.restaurantmanagement.model.Ingredient;
import pl.polsl.project.restaurantmanagement.repositories.IngredientRepository;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class IngredientService {

    private final IngredientRepository ingredientRepository;

    @Autowired
    public IngredientService(IngredientRepository ingredientRepository) {
        this.ingredientRepository = ingredientRepository;
    }

    public Ingredient saveOrUpdateIngredient(Ingredient ingredient) {
        return ingredientRepository.save(ingredient);
    }

    public List<Ingredient> getAllIngredients() {
        return ingredientRepository.findAll();
    }

    public Ingredient getIngredientById(Integer id) { return ingredientRepository.findById(id).orElse(null); }

    //public Optional<Ingredient> getIngredientById(Integer id) { return ingredientRepository.findById(id); }

    public Ingredient addIngredient(Ingredient newIngredient) {
        return ingredientRepository.save(newIngredient);
    }

    public void deleteIngredient(Integer id) {
        ingredientRepository.deleteById(id);
    }

//    public void deleteIngredient(Integer id) {
//        ingredientRepository.deleteById(id);
//    }
//
//    public void addIngredient(Ingredient ingredient) {
//        ingredientRepository.save(ingredient);
//    }

    public Ingredient updateIngredient(Integer id, Ingredient updatedIngredient) {
        return ingredientRepository.findById(id)
                .map(ingredient -> {
                    ingredient.setName(updatedIngredient.getName());
                    ingredient.setAmount(updatedIngredient.getAmount());
                    ingredient.setAmountType(updatedIngredient.getAmountType());
                    return ingredientRepository.save(ingredient);
                })
                .orElseThrow(() -> new NoSuchElementException("Ingredient not found with id " + id));
    }

    //Przykladowe skladniki
    @Transactional
    public void initializeExampleIngredients() {
        if (ingredientRepository.count() == 0) {
            Ingredient ingredient1 = new Ingredient("Flour", 1000, AmountType.GRAMS);
            Ingredient ingredient2 = new Ingredient("Sugar", 500, AmountType.GRAMS);
            Ingredient ingredient3 = new Ingredient("Salt", 20, AmountType.GRAMS);
            Ingredient ingredient4 = new Ingredient("Butter", 200, AmountType.GRAMS);
            Ingredient ingredient5 = new Ingredient("Eggs", 5, AmountType.PIECES);
            ingredientRepository.save(ingredient1);
            ingredientRepository.save(ingredient2);
            ingredientRepository.save(ingredient3);
            ingredientRepository.save(ingredient4);
            ingredientRepository.save(ingredient5);
        }
    }

    //Update ilosci istniejacych skladnikow za pomoca id skladnika
    public void updateIngredients(Ingredient ingredientId, Double newAmount) {
        List<Ingredient> ingredients = ingredientRepository.findAll();
        for (Ingredient ingredient : ingredients) {
            if (ingredient.getId().equals(ingredientId.getId())) {
                ingredient.setAmount(newAmount);
                ingredientRepository.save(ingredient);
            }
        }
    }
}
