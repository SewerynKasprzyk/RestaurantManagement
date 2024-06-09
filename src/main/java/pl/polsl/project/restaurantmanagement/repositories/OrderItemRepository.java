package pl.polsl.project.restaurantmanagement.repositories;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.polsl.project.restaurantmanagement.model.OrderItem;
import pl.polsl.project.restaurantmanagement.model.report.SalesByCategoryReport;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

    Logger logger = LoggerFactory.getLogger(OrderItemRepository.class);

//    @Query("SELECT new pl.polsl.project.restaurantmanagement.model.report.SalesByCategoryReport(" +
//            "m.type, SUM(o.quantity * m.price), COUNT(o), AVG(o.quantity * m.price)) " +
//            "FROM OrderItem o " +
//            "JOIN o.order r " +
//            "JOIN r.user u " +
//            "JOIN u.reservations res " +
//            "JOIN o.menuItem m " +
//            "WHERE res.reservationDate BETWEEN :start AND :end " +
//            "GROUP BY m.type")
//    List<SalesByCategoryReport> findSalesByCategoryReport(@Param("start") LocalDate start, @Param("end") LocalDate end);
//        logger.info("Executing query for sales by category report from {} to {}", start, end);
//        List<SalesByCategoryReport> reports = findSalesByCategoryReportImpl(start, end);
//        logger.info("Query returned {} records", reports.size());
//        return reports;

//    @Query("SELECT new pl.polsl.project.restaurantmanagement.model.report.SalesByCategoryReport(" +
//            "m.type, SUM(o.quantity * m.price), COUNT(o), AVG(o.quantity * m.price)) " +
//            "FROM OrderItem o " +
//            "JOIN o.order r " +
//            "JOIN r.user u " +
//            "JOIN u.reservations res " +
//            "JOIN o.menuItem m " +
//            "WHERE res.reservationDate BETWEEN :start AND :end " +
//            "GROUP BY m.type")
//    List<SalesByCategoryReport> findSalesByCategoryReportImpl(@Param("start") LocalDate start, @Param("end") LocalDate end);


    @Query("SELECT oi FROM OrderItem oi WHERE oi.order.id = :orderId")
    List<OrderItem> findOrderItemsByOrderId(@Param("orderId") Integer orderId);
    List<OrderItem> findByOrderId(Integer orderId);
}
