package pl.polsl.project.restaurantmanagement.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = " ")
@Data
public class Table_entity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = " ")
    private Integer tableId;

    @Column(name = " ")
    private Integer seats;

    @Column(name = " ")
    private Boolean isReserved;
}