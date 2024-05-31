package pl.polsl.project.restaurantmanagement.model.report;

import java.time.LocalDate;

public class ReservationReport {
    private LocalDate date;
    private int count;
    private String averageHours; // Zmieniono typ na String

    public ReservationReport(LocalDate date, int count, String averageHours) {
        this.date = date;
        this.count = count;
        this.averageHours = averageHours;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public String getAverageHours() {
        return averageHours;
    }

    public void setAverageHours(String averageHours) {
        this.averageHours = averageHours;
    }
}