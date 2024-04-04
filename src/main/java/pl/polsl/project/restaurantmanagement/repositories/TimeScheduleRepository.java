package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.project.restaurantmanagement.model.TimeSchedule;

@Repository
public interface TimeScheduleRepository extends JpaRepository<TimeSchedule, Integer> {
    // Define custom queries here if needed
}