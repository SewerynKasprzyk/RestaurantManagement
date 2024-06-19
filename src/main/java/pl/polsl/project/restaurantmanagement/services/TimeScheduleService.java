package pl.polsl.project.restaurantmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.project.restaurantmanagement.model.DTO.TimeScheduleDTO;
import pl.polsl.project.restaurantmanagement.model.DTO.TimeScheduleMapper;
import pl.polsl.project.restaurantmanagement.model.TimeSchedule;
import pl.polsl.project.restaurantmanagement.repositories.TimeScheduleRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TimeScheduleService {

    private final TimeScheduleRepository timeScheduleRepository;
    private final TimeScheduleMapper timeScheduleMapper;

    @Autowired
    public TimeScheduleService(TimeScheduleRepository timeScheduleRepository, TimeScheduleMapper timeScheduleMapper) {
        this.timeScheduleRepository = timeScheduleRepository;
        this.timeScheduleMapper = timeScheduleMapper;
    }

    public List<TimeScheduleDTO> getAllTimeSchedules() {
        List<TimeSchedule> timeSchedules = timeScheduleRepository.findAll();
        return timeSchedules.stream()
                .map(timeScheduleMapper::toTimeScheduleDTO)
                .collect(Collectors.toList());
    }

    public Optional<TimeScheduleDTO> getTimeScheduleById(Integer id) {
        return timeScheduleRepository.findById(id)
                .map(timeScheduleMapper::toTimeScheduleDTO);
    }

    public TimeScheduleDTO createOrUpdateTimeSchedule(TimeScheduleDTO timeScheduleDTO) {
        Optional<TimeSchedule> existingSchedule = timeScheduleRepository.findByUserIdAndDay(timeScheduleDTO.getUserId(), timeScheduleDTO.getDay());

        TimeSchedule timeSchedule;
        if (existingSchedule.isPresent()) {
            timeSchedule = existingSchedule.get();
            timeSchedule.setStartHour(timeScheduleDTO.getStartHour());
            timeSchedule.setEndHour(timeScheduleDTO.getEndHour());
        } else {
            timeSchedule = timeScheduleMapper.toTimeSchedule(timeScheduleDTO);
        }

        TimeSchedule savedTimeSchedule = timeScheduleRepository.save(timeSchedule);
        return timeScheduleMapper.toTimeScheduleDTO(savedTimeSchedule);
    }

    public TimeScheduleDTO updateTimeSchedule(Integer id, TimeScheduleDTO updatedTimeScheduleDTO) {
        TimeSchedule timeSchedule = timeScheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TimeSchedule with id " + id + " not found."));

        timeScheduleMapper.updateTimeScheduleFromDTO(updatedTimeScheduleDTO, timeSchedule);

        TimeSchedule savedTimeSchedule = timeScheduleRepository.save(timeSchedule);
        return timeScheduleMapper.toTimeScheduleDTO(savedTimeSchedule);
    }

    public void softDeleteTimeSchedule(Integer id) {
        TimeSchedule timeSchedule = timeScheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("TimeSchedule with id " + id + " not found."));

        timeSchedule.setIsActive(false);
        timeScheduleRepository.save(timeSchedule);
    }

    public List<TimeSchedule> getTimeSchedulesByUserId(Integer userId) {
        return timeScheduleRepository.findByUserId(userId);
    }
}
