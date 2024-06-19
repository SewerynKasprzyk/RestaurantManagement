package pl.polsl.project.restaurantmanagement.model.DTO;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import pl.polsl.project.restaurantmanagement.configuration.UserMapper;
import pl.polsl.project.restaurantmanagement.model.TimeSchedule;
import pl.polsl.project.restaurantmanagement.model.User;
import pl.polsl.project.restaurantmanagement.repositories.UserRepository;

@Mapper(componentModel = "spring", uses = {UserMapper.class, TimeScheduleMapper.UserMapperHelper.class})
public interface TimeScheduleMapper {
    @Mapping(target = "user", source = "userId", qualifiedByName = "userIdToUser")
    TimeSchedule toTimeSchedule(TimeScheduleDTO timeScheduleDTO);

    @Mapping(target = "userId", source = "user.id")
    TimeScheduleDTO toTimeScheduleDTO(TimeSchedule timeSchedule);

    @Mapping(target = "user", source = "userId", qualifiedByName = "userIdToUser")
    void updateTimeScheduleFromDTO(TimeScheduleDTO timeScheduleDTO, @MappingTarget TimeSchedule timeSchedule);

    @Component
    class UserMapperHelper {
        @Autowired
        private UserRepository userRepository;

        @Named("userIdToUser")
        public User userIdToUser(Integer userId) {
            return userRepository.findById(userId).orElse(null);
        }
    }
}

