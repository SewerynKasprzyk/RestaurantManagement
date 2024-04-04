package pl.polsl.project.restaurantmanagement.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.project.restaurantmanagement.model.TableEntity;
import pl.polsl.project.restaurantmanagement.repositories.TableRepository;

import java.util.List;

@Service
public class TableService {

    private final TableRepository tableRepository;

    @Autowired
    public TableService(TableRepository tableRepository) {
        this.tableRepository = tableRepository;
    }

    public TableEntity saveOrUpdateTable(TableEntity table) {
        return tableRepository.save(table);
    }

    public List<TableEntity> getAllTables() {
        return tableRepository.findAll();
    }

    public TableEntity getTableById(Integer id) {
        return tableRepository.findById(id).orElse(null);
    }

    public void deleteTable(Integer id) {
        tableRepository.deleteById(id);
    }
}

