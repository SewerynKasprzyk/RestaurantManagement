package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import pl.polsl.project.restaurantmanagement.model.MenuItem;
import pl.polsl.project.restaurantmanagement.model.ReportData;

import java.util.List;

@Repository
public class ReportRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<MenuItem> findAll(String date, String startHour, String endHour){
        String sql = "Select * from menu_items";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(MenuItem.class));
    }
}
