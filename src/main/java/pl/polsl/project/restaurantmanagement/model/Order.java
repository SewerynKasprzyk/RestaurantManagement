package pl.polsl.project.restaurantmanagement.model;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = " ")
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = " ")
    private Integer orderId;

    @Column(name = " ")
    private Integer menuItem;

    @Column(name = " ")
    private String totalPrice;

    @Column(name = " ")
    private String notes;
}