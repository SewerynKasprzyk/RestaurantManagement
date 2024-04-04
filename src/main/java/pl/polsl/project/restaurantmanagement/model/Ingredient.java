package pl.polsl.project.restaurantmanagement.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "ingredients")
@Data
@NoArgsConstructor
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ingredient_id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "amount")
    private double amount;

    @Enumerated(EnumType.STRING)
    @Column(name = "amount_type")
    private AmountType amountType;

    public Ingredient(String name, double amount, AmountType amountType) {
        this.name = name;
        this.amount = amount;
        this.amountType = amountType;
    }
}
