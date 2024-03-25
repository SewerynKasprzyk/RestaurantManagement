package pl.polsl.project.restaurantmanagement.model;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = " ")
@Data
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = " ")
    private Integer ingredientId;

    @Column(name = " ")
    private String name;

    @Column(name = " ")
    private Double amount;

    @Enumerated(EnumType.STRING)
    @Column(name = " ")
    private AmountType amountType;

    public enum AmountType {
        // Define your enum values here
    }
}