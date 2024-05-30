package pl.polsl.project.restaurantmanagement.services;

import org.springframework.stereotype.Service;
import pl.polsl.project.restaurantmanagement.model.ReportData;
import pl.polsl.project.restaurantmanagement.repositories.ReportRepository;

import java.util.List;

@Service
public class ReportService {

    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository){
        this.reportRepository = reportRepository;
    }

    public List<ReportData> getReportData(String date, String startHour, String endHour){
        //return reportRepository.fetchReportData(date, startHour, endHour);
    }
}
