package pl.polsl.project.restaurantmanagement.configuration;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@AllArgsConstructor
@Builder
@Data
public class ErrorDto {

        private String message;
}
