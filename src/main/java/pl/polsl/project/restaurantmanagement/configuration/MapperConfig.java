package pl.polsl.project.restaurantmanagement.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {

    @Bean
    public OrderItemMapper orderItemMapper() {
        return OrderItemMapper.INSTANCE;
    }
}
