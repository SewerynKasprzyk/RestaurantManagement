package pl.polsl.project.restaurantmanagement.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.polsl.project.restaurantmanagement.model.MenuItem;
import org.springframework.transaction.annotation.Transactional;
import pl.polsl.project.restaurantmanagement.model.MenuItemType;
import java.util.List;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Integer> {
    MenuItem findByName(String name);

    @Modifying
    @Transactional
    @Query("UPDATE MenuItem m SET m.name = :name, m.type = :type, m.price = :price, m.description = :description WHERE m.id = :id")
    void updateOrSave(@Param("id") Integer id, @Param("name") String name, @Param("type") MenuItemType type, @Param("price") Double price, @Param("description") String description);

    @Query("SELECT m.type FROM MenuItem m")
    List<MenuItemType> findAllMenuItemTypes();

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO menu_items (name, type, price, description) VALUES (:name, :type, :price, :description)", nativeQuery = true)
    void insertMenuItem(@Param("name") String name, @Param("type") String type, @Param("price") Double price, @Param("description") String description);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM menu_items WHERE menu_item_id = :id", nativeQuery = true)
    void deleteByQuery(@Param("id") Integer id);

}