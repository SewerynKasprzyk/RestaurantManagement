package pl.polsl.project.restaurantmanagement.services;

import jakarta.persistence.Table;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.polsl.project.restaurantmanagement.model.TableEntity;
import pl.polsl.project.restaurantmanagement.repositories.TableRepository;

import java.math.BigDecimal;
import java.util.List;

import static pl.polsl.project.restaurantmanagement.model.MenuItemType.*;

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
    @Transactional
    public void initializeExampleTables() {
        if (tableRepository.count() == 0) {
            TableEntity table1 = new TableEntity(4);
            TableEntity table2 = new TableEntity(4);
            TableEntity table3 = new TableEntity(4);
            TableEntity table4 = new TableEntity(5);
            TableEntity table5 = new TableEntity(6);
            tableRepository.save(table1);
            tableRepository.save(table2);
            tableRepository.save(table3);
            tableRepository.save(table4);
            tableRepository.save(table5);
        }
    }
}

