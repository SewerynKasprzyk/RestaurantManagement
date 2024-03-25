package pl.polsl.project.restaurantmanagement.model;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = " ")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = " ")
    private Integer userId;

    @Column(name = " ")
    private Integer orderId;

    @Column(name = " ")
    private Integer reservationId;

    @Column(name = " ")
    private Integer timeScheduleId;

    @Enumerated(EnumType.STRING)
    @Column(name = " ")
    private UserType userType;

    @Column(name = " ")
    private String login;

    @Column(name = " ")
    private String password;

    @Column(name = " ")
    private String name;

    @Column(name = " ")
    private String surname;

    @Column(name = " ")
    private String phoneNumber;

    @Column(name = " ")
    private Boolean isVerified;

    @Column(name = " ")
    private Boolean isActive;

    public enum UserType {
        // Define your enum values here
    }
}