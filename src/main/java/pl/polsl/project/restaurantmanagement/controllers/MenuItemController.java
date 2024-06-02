package pl.polsl.project.restaurantmanagement.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.project.restaurantmanagement.model.MenuItem;
import pl.polsl.project.restaurantmanagement.services.MenuItemService;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
@RequiredArgsConstructor
public class MenuItemController {

    private final MenuItemService menuItemService;

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

    //dodane żeby update itemy w menu
    @PutMapping("/{id}")
    public ResponseEntity<MenuItem> updateMenuItem(@PathVariable Integer id, @RequestBody MenuItem newMenuItemData) {
        MenuItem menuItem = menuItemService.getMenuItemById(id);
        if (menuItem != null) {
            menuItem.setName(newMenuItemData.getName());
            menuItem.setType(newMenuItemData.getType());
            menuItem.setPrice(newMenuItemData.getPrice());
            menuItem.setDescription(newMenuItemData.getDescription());
            menuItemService.saveOrUpdateMenuItem(menuItem);
            return new ResponseEntity<>(menuItem, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
