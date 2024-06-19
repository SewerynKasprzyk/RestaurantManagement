package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.polsl.project.restaurantmanagement.model.DayOfWeek;
import pl.polsl.project.restaurantmanagement.model.TimeSchedule;
import pl.polsl.project.restaurantmanagement.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface TimeScheduleRepository extends JpaRepository<TimeSchedule, Integer> {
    Optional<TimeSchedule> findByUserIdAndDay(Integer userId, DayOfWeek day);
    List<TimeSchedule> findByUserId(Integer userId);
    @Query("SELECT DISTINCT ts.user FROM TimeSchedule ts WHERE ts.day = :day AND ts.user.isActive = true")
    List<User> findEmployeesWithSchedulesForDay(@Param("day") DayOfWeek day);
}
