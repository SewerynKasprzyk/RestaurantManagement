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
import pl.polsl.project.restaurantmanagement.services.MenuItemService;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reports")
public class SalesReportController {

    private final ReportService reportService;
    private final MenuItemService menuItemService;

    @Autowired
    public SalesReportController(ReportService reportService, MenuItemService menuItemService) {
        this.reportService = reportService;
        this.menuItemService = menuItemService;
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {
        List<String> categories = menuItemService.getAllMenuItemTypes().stream()
                .map(Enum::name)
                .collect(Collectors.toList());
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/sales-by-category")
    public ResponseEntity<List<SalesByCategoryReport>> getSalesByCategoryReport(
            @RequestParam("start") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam("end") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end,
            @RequestParam("category") String category,
            @RequestParam("startHour") String startHour,
            @RequestParam("endHour") String endHour) {
        List<SalesByCategoryReport> reports = reportService.getSalesByCategoryReport(start, end, category, startHour, endHour);
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }
}