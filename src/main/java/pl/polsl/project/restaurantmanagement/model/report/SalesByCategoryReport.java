package pl.polsl.project.restaurantmanagement.model.report;

public class SalesByCategoryReport {
    private String category;
    private double totalSales;
    private int orderCount;

    public SalesByCategoryReport(String category) {
        this.category = category;
        this.totalSales = 0.0;
        this.orderCount = 0;
    }

    public void addSale(double sale) {
        this.totalSales += sale;
        this.orderCount++;
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
}