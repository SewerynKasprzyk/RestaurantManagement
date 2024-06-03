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
        <div className="container" style={{marginTop:"1rem"}}>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title mb-4">Raport okresowy rezerwacji</h1>
                            <div className="mb-3">
                                <label className="form-label">Data początkowa:</label>
                                <DatePicker className="form-control" selected={startDate} onChange={date => setStartDate(date)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Data końcowa:</label>
                                <DatePicker className="form-control" selected={endDate} onChange={date => setEndDate(date)} />
                            </div>
                            <button className="btn btn-primary mb-3" onClick={fetchReservations} disabled={loading}>
                                {loading ? 'Ładowanie...' : 'Generuj raport'}
                            </button>
                            <table className="table" style={{ textAlign: "center" }}>
                                <thead>
                                    <tr>
                                        <th>Data</th>
                                        <th>Ilość rezerwacji</th>
                                        <th>Średnia ilość godzin rezerwacji</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {reservations.map(report => (
                                        <tr key={report.date}>
                                            <td>{report.date}</td>
                                            <td>{report.count}</td>
                                            <td>{report.averageHours}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ReservationsReport;