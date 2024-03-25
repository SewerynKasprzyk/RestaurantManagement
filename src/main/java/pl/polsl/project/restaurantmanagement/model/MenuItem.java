package pl.polsl.project.restaurantmanagement.model;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = " ")
@Data
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = " ")
    private Integer menuItemId;

    @Column(name = " ")
    private Integer ingredientsId;

    @Column(name = " ")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = " ")
    private Type type;

    @Column(name = " ")
    private BigDecimal price;

    @Column(name = " ")
    private String description;

    public enum Type {
        // Define your enum values here
    }
}