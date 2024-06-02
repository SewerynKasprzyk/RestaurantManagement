package pl.polsl.project.restaurantmanagement.controllers.report;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.polsl.project.restaurantmanagement.model.report.SalesByCategoryReport;
import pl.polsl.project.restaurantmanagement.services.report.ReportService;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class SalesReportController {

    private final ReportService reportService;

    @Autowired
    public SalesReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/sales-by-category")
    public ResponseEntity<List<SalesByCategoryReport>> getSalesByCategoryReport(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        List<SalesByCategoryReport> reports = reportService.getSalesByCategoryReport(start, end);
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }
}