package pl.polsl.project.restaurantmanagement.model.report;

import pl.polsl.project.restaurantmanagement.model.MenuItemType;

public class SalesByCategoryReport {
    private String day;
    private String category;
    private double totalSales;
    private double averageOrderValue;

    private int orderCount;

    public SalesByCategoryReport(String category) {
        this.category = category;
        this.totalSales = 0.0;
        this.orderCount = 0;
    }

    // Nowy konstruktor
    public SalesByCategoryReport(MenuItemType category, Long totalSales, Long orderCount, Double averageSale) {
        this.category = category.name();
        this.totalSales = totalSales != null ? totalSales : 0;
        this.orderCount = orderCount != null ? orderCount.intValue() : 0;
    }

    public void addSale(double sale) {
        totalSales += sale;
        orderCount++;
        averageOrderValue = totalSales / orderCount;
    }

    // Dodajemy metodę setDay
    public void setDay(String day) {
        this.day = day;
    }

    // Dodajemy metodę getDay
    public String getDay() {
        return day;
    }

    public String getCategory() {
        return category;
    }

    public double getTotalSales() {
        return totalSales;
    }

    public int getOrderCount() {
        return orderCount;
    }

    public double getAverageSale() {
        return orderCount > 0 ? totalSales / orderCount : 0;
    }

    public double getAverageOrderValue() {
        return averageOrderValue;
    }

    public void setAverageOrderValue(double averageOrderValue) {
        this.averageOrderValue = averageOrderValue;
    }
}