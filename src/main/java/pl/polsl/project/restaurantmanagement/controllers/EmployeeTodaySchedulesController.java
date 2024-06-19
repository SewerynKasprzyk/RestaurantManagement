package pl.polsl.project.restaurantmanagement.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.project.restaurantmanagement.model.User;
import pl.polsl.project.restaurantmanagement.repositories.TimeScheduleRepository;
import pl.polsl.project.restaurantmanagement.repositories.UserRepository;
import pl.polsl.project.restaurantmanagement.model.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/employees/today-schedules")
public class EmployeeTodaySchedulesController {

    private final TimeScheduleRepository timeScheduleRepository;
    private final UserRepository userRepository;

    @Autowired
    public EmployeeTodaySchedulesController(TimeScheduleRepository timeScheduleRepository, UserRepository userRepository) {
        this.timeScheduleRepository = timeScheduleRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<User> getEmployeesWithTodaySchedules() {
        // Get the current day of the week (MONDAY, TUESDAY, etc.)
        String DayOfWeekString = LocalDate.now().getDayOfWeek().toString();
        DayOfWeek today = DayOfWeek.valueOf(DayOfWeekString);

        // Fetch employees who have time schedules for today
        List<User> employeesWithSchedules = timeScheduleRepository.findEmployeesWithSchedulesForDay(today);

        return employeesWithSchedules;
    }
}
