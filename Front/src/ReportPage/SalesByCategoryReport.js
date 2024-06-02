import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SalesByCategoryReport = () => {
    const [sales, setSales] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [loading, setLoading] = useState(false);

    const fetchSales = async () => {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/reports/sales-by-category?start=${startDate.toISOString().split('T')[0]}&end=${endDate.toISOString().split('T')[0]}`);
        if (Array.isArray(response.data)) {
            setSales(response.data);
        } else {
            console.error('Unexpected server response:', response.data);
            setSales([]);
        }
        setLoading(false);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1>Raport sprzedaży według kategorii</h1>
            <div>
                <label>Data początkowa:</label>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
            </div>
            <div>
                <label>Data końcowa:</label>
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
            </div>
            <button onClick={fetchSales} disabled={loading}>
                {loading ? 'Ładowanie...' : 'Generuj raport'}
            </button>
            <table style={{ margin: "auto", textAlign: "center", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th style={{ marginRight: "20px", border: "1px solid black", padding: "10px" }}>Kategoria</th>
                    <th style={{ marginRight: "20px", border: "1px solid black", padding: "10px" }}>Całkowita sprzedaż</th>
                    <th style={{ marginRight: "20px", border: "1px solid black", padding: "10px" }}>Ilość zamówień</th>
                    <th style={{ marginRight: "20px", border: "1px solid black", padding: "10px" }}>Średnia sprzedaż</th>
                </tr>
                </thead>
                <tbody>
                {sales.map(report => (
                    <tr key={report.category}>
                        <td style={{ border: "1px solid black", padding: "10px" }}>{report.category}</td>
                        <td style={{ border: "1px solid black", padding: "10px" }}>{report.totalSales}</td>
                        <td style={{ border: "1px solid black", padding: "10px" }}>{report.orderCount}</td>
                        <td style={{ border: "1px solid black", padding: "10px" }}>{report.averageSale}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesByCategoryReport;