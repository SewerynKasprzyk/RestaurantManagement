package pl.polsl.project.restaurantmanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.project.restaurantmanagement.repositories.TimeScheduleRepository;

@Service
public class TimeScheduleService {

    private final TimeScheduleRepository timeScheduleRepository;

    @Autowired
    public TimeScheduleService(TimeScheduleRepository timeScheduleRepository) {
        this.timeScheduleRepository = timeScheduleRepository;
    }

    // Add your service methods here
}
