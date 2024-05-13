package pl.polsl.project.restaurantmanagement.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.project.restaurantmanagement.model.AmountType;
import pl.polsl.project.restaurantmanagement.model.Ingredient;
import pl.polsl.project.restaurantmanagement.model.MenuItem;
import pl.polsl.project.restaurantmanagement.repositories.MenuItemRepository;

import java.math.BigDecimal;
import java.util.List;

import static pl.polsl.project.restaurantmanagement.model.MenuItemType.*;

@Service
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;

    @Autowired
    public MenuItemService(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    public MenuItem saveOrUpdateMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    public MenuItem getMenuItemById(Integer id) {
        return menuItemRepository.findById(id).orElse(null);
    }

    public MenuItem getMenuItemByName(String name) { return menuItemRepository.findByName(name); }

    public void deleteMenuItem(Integer id) {
        menuItemRepository.deleteById(id);
    }

    //Tworzenie przykladowych pozycji menu
    @Transactional
    public void initializeExampleMenuItems() {
        if (menuItemRepository.count() == 0) {
            MenuItem menuItem1 = new MenuItem("Pizza", MAIN_COURSE, BigDecimal.valueOf(20.0) , "Pizza with cheese and tomato sauce");
            MenuItem menuItem2 = new MenuItem("Pasta", MAIN_COURSE, BigDecimal.valueOf(15.5), "Pasta with tomato sauce");
            MenuItem menuItem3 = new MenuItem("Salad",APPETIZER, BigDecimal.valueOf(8.0), "Grece salad");
            MenuItem menuItem4 = new MenuItem("Soup", MAIN_COURSE, BigDecimal.valueOf(10.0), "Tomato soup");
            MenuItem menuItem5 = new MenuItem("Cola", BEVERAGE, BigDecimal.valueOf(5.5), "Cola 0.33l");
            menuItemRepository.save(menuItem1);
            menuItemRepository.save(menuItem2);
            menuItemRepository.save(menuItem3);
            menuItemRepository.save(menuItem4);
            menuItemRepository.save(menuItem5);
        }
    }

    //Dodawanie skladnikow do danego menu itemu (przyklad)
    private void addIngredientsToMenuItem(Integer menuItemId, List<Ingredient> ingredients){
        MenuItem menuItem = menuItemRepository.findById(menuItemId).orElse(null);
        if(menuItem != null){
            ingredients.add(new Ingredient("Flour", 1000, AmountType.GRAMS));
            ingredients.add(new Ingredient("Cheese", 10,AmountType.PIECES));
            menuItem.setIngredients(ingredients);
            menuItemRepository.save(menuItem);
        }
    }
}