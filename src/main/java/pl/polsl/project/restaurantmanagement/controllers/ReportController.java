package pl.polsl.project.restaurantmanagement.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.project.restaurantmanagement.model.ReportData;
import pl.polsl.project.restaurantmanagement.services.ReportService;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    private final ReportService reportService;

    public ReportController(ReportService reportService){
        this.reportService = reportService;
    }

    public ResponseEntity<List<ReportData>> getReportData(
            @RequestParam String date,
            @RequestParam String startHour,
            @RequestParam String endHour
    ){
        List<ReportData> data = reportService.getReportData(date, startHour, endHour);
            return ResponseEntity.ok(data);

    }
}
