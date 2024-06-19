import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SalesByCategoryReport = () => {
    const [sales, setSales] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [category, setCategory] = useState('');
    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await axios.get('http://localhost:8080/api/reports/categories');
            setCategories(response.data);
        };

        fetchCategories();
    }, []);

    const fetchSales = async () => {
        if (endDate < startDate) {
            alert('End date cannot be lower than start date');
            return;
        }

        if (endHour < startHour) {
            alert('End hour cannot be lower than start hour');
            return;
        }

        setLoading(true);
        console.log(`Fetching sales data from ${startDate.toISOString().split('T')[0]} to ${endDate.toISOString().split('T')[0]}`);
        const response = await axios.get(`http://localhost:8080/api/reports/sales-by-category?start=${startDate.toISOString().split('T')[0]}&end=${endDate.toISOString().split('T')[0]}&category=${category}&startHour=${startHour}&endHour=${endHour}`);
        if (Array.isArray(response.data)) {
            console.log(`Received ${response.data.length} sales records`);
            setSales(response.data);
        } else {
            console.error('Unexpected server response:', response.data);
            setSales([]);
        }
        setLoading(false);
    };

    return (
        <div className="container" style={{marginTop:"1rem"}}>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="card-title mb-4">Sales by category report</h1>
                            <div className="mb-3">
                                <label className="form-label">Starting date:</label>
                                <DatePicker className="form-control" selected={startDate} onChange={date => setStartDate(date)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Ending date:</label>
                                <DatePicker className="form-control" selected={endDate} onChange={date => setEndDate(date)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Category:</label>
                                <select className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Start hour:</label>
                                <input type="time" className="form-control" value={startHour} onChange={e => setStartHour(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">End hour:</label>
                                <input type="time" className="form-control" value={endHour} onChange={e => setEndHour(e.target.value)} />
                            </div>
                            <button className="btn btn-primary mb-3" onClick={fetchSales} disabled={loading}>
                                {loading ? 'Loading...' : 'Generate report'}
                            </button>
                            <table className="table" style={{ textAlign: "center" }}>
                                <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Total sales</th>
                                    <th>Average value</th>
                                </tr>
                                </thead>
                                <tbody>
                                {sales.map(report => {
                                    console.log(`Rendering sales data for ${report.day}: total sales = ${report.totalSales}, average order value = ${report.averageOrderValue}`);
                                    return (
                                        <tr key={report.day}>
                                            <td>{report.day}</td>
                                            <td>{report.totalSales}</td>
                                            <td>{report.averageOrderValue}</td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SalesByCategoryReport;