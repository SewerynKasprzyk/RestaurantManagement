package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.polsl.project.restaurantmanagement.model.DayOfWeek;
import pl.polsl.project.restaurantmanagement.model.TimeSchedule;

import java.util.Optional;

@Repository
public interface TimeScheduleRepository extends JpaRepository<TimeSchedule, Integer> {
    Optional<TimeSchedule> findByUserIdAndDay(Integer userId, DayOfWeek day);
}
