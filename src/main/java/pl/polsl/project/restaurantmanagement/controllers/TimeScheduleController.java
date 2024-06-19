package pl.polsl.project.restaurantmanagement.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.polsl.project.restaurantmanagement.model.DTO.TimeScheduleDTO;
import pl.polsl.project.restaurantmanagement.services.TimeScheduleService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/time-schedules")
public class TimeScheduleController {

    private final TimeScheduleService timeScheduleService;

    @Autowired
    public TimeScheduleController(TimeScheduleService timeScheduleService) {
        this.timeScheduleService = timeScheduleService;
    }

    @GetMapping
    public List<TimeScheduleDTO> getAllTimeSchedules() {
        return timeScheduleService.getAllTimeSchedules();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TimeScheduleDTO> getTimeScheduleById(@PathVariable Integer id) {
        Optional<TimeScheduleDTO> timeSchedule = timeScheduleService.getTimeScheduleById(id);
        return timeSchedule.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TimeScheduleDTO> createOrUpdateTimeSchedule(@RequestBody TimeScheduleDTO timeScheduleDTO) {
        TimeScheduleDTO createdOrUpdatedTimeSchedule = timeScheduleService.createOrUpdateTimeSchedule(timeScheduleDTO);
        return ResponseEntity.ok(createdOrUpdatedTimeSchedule);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TimeScheduleDTO> updateTimeSchedule(@PathVariable Integer id, @RequestBody TimeScheduleDTO timeScheduleDTO) {
        try {
            TimeScheduleDTO updatedTimeSchedule = timeScheduleService.updateTimeSchedule(id, timeScheduleDTO);
            return ResponseEntity.ok(updatedTimeSchedule);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> softDeleteTimeSchedule(@PathVariable Integer id) {
        try {
            timeScheduleService.softDeleteTimeSchedule(id);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
