package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.polsl.project.restaurantmanagement.model.TimeSchedule;

public interface TimeScheduleRepository extends JpaRepository<TimeSchedule, Integer> {
}