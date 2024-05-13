package pl.polsl.project.restaurantmanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.project.restaurantmanagement.model.MenuItem;
import pl.polsl.project.restaurantmanagement.services.MenuItemService;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuItemController {

    private final MenuItemService menuItemService;

    @Autowired
    public MenuItemController(MenuItemService menuItemService) { this.menuItemService = menuItemService; }

    @GetMapping
    public ResponseEntity<List<MenuItem>> getAllMenuItems() { return new ResponseEntity<List<MenuItem>>(menuItemService.getAllMenuItems(), HttpStatus.OK); }

    @GetMapping("/{name}")
    public ResponseEntity<MenuItem> getSingleMenuItemByName(@PathVariable String name) {
        MenuItem menuItem = menuItemService.getMenuItemByName(name);
        if (menuItem != null) {
            return new ResponseEntity<>(menuItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
