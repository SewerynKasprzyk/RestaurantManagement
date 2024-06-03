package pl.polsl.project.restaurantmanagement.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.project.restaurantmanagement.model.MenuItem;
import pl.polsl.project.restaurantmanagement.model.MenuItemType;
import pl.polsl.project.restaurantmanagement.services.MenuItemService;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/menu")
@RequiredArgsConstructor
public class MenuItemController {

    private final MenuItemService menuItemService;

    @GetMapping
    public ResponseEntity<List<MenuItem>> getAllMenuItems() { return new ResponseEntity<List<MenuItem>>(menuItemService.getAllMenuItems(), HttpStatus.OK); }

    @GetMapping("/types")
    public ResponseEntity<List<MenuItemType>> getAllMenuItemTypes() {
        return new ResponseEntity<>(menuItemService.getAllMenuItemTypes(), HttpStatus.OK);
    }

//    @PostMapping("/add")
//    public ResponseEntity<MenuItem> addMenuItem(@RequestParam("name") String name, @RequestParam("type") MenuItemType type, @RequestParam("price") Double price, @RequestParam("description") String description) {
//        MenuItem newMenuItem = new MenuItem(name, type, BigDecimal.valueOf(price), description);
//        menuItemService.addMenuItem(newMenuItem);
//        return new ResponseEntity<>(HttpStatus.CREATED);
//    }

    @PostMapping("/add")
    public ResponseEntity<MenuItem> addMenuItem(@RequestBody MenuItem newMenuItem) {
        menuItemService.addMenuItem(newMenuItem);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Integer id) {
        menuItemService.deleteMenuItem(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

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
        newMenuItemData.setId(id);
        MenuItem updatedMenuItem = menuItemService.saveOrUpdateMenuItem(newMenuItemData);
        return new ResponseEntity<>(updatedMenuItem, HttpStatus.OK);
    }


}
