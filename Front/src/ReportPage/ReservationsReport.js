import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReservationsReport = () => {
    const [reservations, setReservations] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [loading, setLoading] = useState(false);

    const fetchReservations = async () => {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/reports/reservations?start=${startDate.toISOString()}&end=${endDate.toISOString()}`);
        if (Array.isArray(response.data)) {
            setReservations(response.data);
        } else {
            console.error('Unexpected server response:', response.data);
            setReservations([]);
        }
        setLoading(false);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h1>Raport okresowy rezerwacji</h1>
            <div>
                <label>Data początkowa:</label>
                <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
            </div>
            <div>
                <label>Data końcowa:</label>
                <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
            </div>
            <button onClick={fetchReservations} disabled={loading}>
                {loading ? 'Ładowanie...' : 'Generuj raport'}
            </button>
            <table style={{ margin: "auto", textAlign: "center", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th style={{ marginRight: "20px", border: "1px solid black", padding: "10px" }}>Data</th>
                    <th style={{ marginRight: "20px", border: "1px solid black", padding: "10px" }}>Ilość rezerwacji</th>
                    <th style={{ marginRight: "20px", border: "1px solid black", padding: "10px" }}>Średnia ilość godzin rezerwacji</th>
                </tr>
                </thead>
                <tbody>
                {reservations.map(report => (
                    <tr key={report.date}>
                        <td style={{ border: "1px solid black", padding: "10px" }}>{report.date}</td>
                        <td style={{ border: "1px solid black", padding: "10px" }}>{report.count}</td>
                        <td style={{ border: "1px solid black", padding: "10px" }}>{report.averageHours}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationsReport;