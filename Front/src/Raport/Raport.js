import React, { useState } from 'react';
import axios from 'axios';

export default function GenerateReport() {
    const [date, setDate] = useState('');
    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const [reportData, setReportData] = useState([]);

    const getReport = async () => {
        try {
            const response = await axios.get('/api/reports', {
                params: {
                    date: date,
                    startHour: startHour,
                    endHour: endHour
                }
            });
            setReportData(response.data);
        } catch (error) {
            console.error('Error fetching report data:', error);
        }
    };

    return (
        <div>
            <h2>Generate Report</h2>
            <form onSubmit={(e) => { e.preventDefault(); getReport(); }}>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="startHour">Start Hour:</label>
                    <input
                        type="time"
                        id="startHour"
                        value={startHour}
                        onChange={(e) => setStartHour(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="endHour">End Hour:</label>
                    <input
                        type="time"
                        id="endHour"
                        value={endHour}
                        onChange={(e) => setEndHour(e.target.value)}
                    />
                </div>
                <button type="submit">Generate Report</button>
            </form>
            <h3>Report Data</h3>
            {reportData.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reportData.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.value}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data available for the selected period.</p>
            )}
        </div>
    );
}
