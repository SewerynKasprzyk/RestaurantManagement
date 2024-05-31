package pl.polsl.project.restaurantmanagement.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class SignUpDto {

    private String login;
    private String password;
    private String name;
    private String surname;
    private String phoneNumber;
}
