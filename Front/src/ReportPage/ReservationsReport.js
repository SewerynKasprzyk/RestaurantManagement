import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReservationsReport = () => {
    const [reservations, setReservations] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchReservations = async () => {
        if (endDate < startDate) {
            setErrorMessage('The end date cannot be earlier than the start date');
            return;
        }
        setErrorMessage('');
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
                            <h1 className="card-title mb-4">Periodic booking report</h1>
                            <div className="mb-3">
                                <label className="form-label">Starting date:</label>
                                <DatePicker className="form-control" selected={startDate} onChange={date => setStartDate(date)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Ending date:</label>
                                <DatePicker className="form-control" selected={endDate} onChange={date => setEndDate(date)} />
                            </div>
                            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
                            <button className="btn btn-primary mb-3" onClick={fetchReservations} disabled={loading}>
                                {loading ? 'Loading...' : 'Generate report'}
                            </button>
                            <table className="table" style={{ textAlign: "center" }}>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Amount of reservations</th>
                                        <th>Average reservation duration</th>
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