package pl.polsl.project.restaurantmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.project.restaurantmanagement.model.TimeSchedule;
import pl.polsl.project.restaurantmanagement.repositories.TimeScheduleRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TimeScheduleService {

    private final TimeScheduleRepository timeScheduleRepository;

    @Autowired
    public TimeScheduleService(TimeScheduleRepository timeScheduleRepository) {
        this.timeScheduleRepository = timeScheduleRepository;
    }

    public List<TimeSchedule> getAllTimeSchedules() {
        return timeScheduleRepository.findAll();
    }

    public Optional<TimeSchedule> getTimeScheduleById(Integer id) {
        return timeScheduleRepository.findById(id);
    }

    public TimeSchedule createTimeSchedule(TimeSchedule timeSchedule) {
        return timeScheduleRepository.save(timeSchedule);
    }

    public TimeSchedule updateTimeSchedule(Integer id, TimeSchedule updatedTimeSchedule) {
        Optional<TimeSchedule> existingTimeScheduleOptional = timeScheduleRepository.findById(id);
        if (existingTimeScheduleOptional.isPresent()) {
            updatedTimeSchedule.setId(id);
            return timeScheduleRepository.save(updatedTimeSchedule);
        } else {
            throw new RuntimeException("TimeSchedule with id " + id + " not found.");
        }
    }

    public void deleteTimeSchedule(Integer id) {
        timeScheduleRepository.deleteById(id);
    }
}