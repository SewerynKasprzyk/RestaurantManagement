package pl.polsl.project.restaurantmanagement.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.project.restaurantmanagement.services.OrderItemService;

@RestController
@RequestMapping("/api/orderitems")
@RequiredArgsConstructor
public class OrderItemsController {

    private final OrderItemService orderItemService;
}
