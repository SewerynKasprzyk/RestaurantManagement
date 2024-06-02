package pl.polsl.project.restaurantmanagement.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "tables")
@Data
@NoArgsConstructor
public class TableEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "table_id")
    private Integer id;

    @Column(name = "seats_amount")
    private Integer seatsAmount;



    public TableEntity(Integer seatsAmount) {
        this.seatsAmount = seatsAmount;
    }
}

