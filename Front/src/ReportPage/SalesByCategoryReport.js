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
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/reports/sales-by-category?start=${startDate.toISOString().split('T')[0]}&end=${endDate.toISOString().split('T')[0]}&category=${category}&startHour=${startHour}&endHour=${endHour}`);
        if (Array.isArray(response.data)) {
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
                            <h1 className="card-title mb-4">Raport sprzedaży według kategorii</h1>
                            <div className="mb-3">
                                <label className="form-label">Data początkowa:</label>
                                <DatePicker className="form-control" selected={startDate} onChange={date => setStartDate(date)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Data końcowa:</label>
                                <DatePicker className="form-control" selected={endDate} onChange={date => setEndDate(date)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Kategoria:</label>
                                <select className="form-control" value={category} onChange={e => setCategory(e.target.value)}>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Godzina początkowa:</label>
                                <input type="time" className="form-control" value={startHour} onChange={e => setStartHour(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Godzina końcowa:</label>
                                <input type="time" className="form-control" value={endHour} onChange={e => setEndHour(e.target.value)} />
                            </div>
                            <button className="btn btn-primary mb-3" onClick={fetchSales} disabled={loading}>
                                {loading ? 'Ładowanie...' : 'Generuj raport'}
                            </button>
                            <table className="table" style={{ textAlign: "center" }}>
                                <thead>
                                <tr>
                                    <th>Dzień</th>
                                    <th>Suma sprzedaży</th>
                                    <th>Średnia wartość zamówienia</th>
                                </tr>
                                </thead>
                                <tbody>
                                {sales.map(report => (
                                    <tr key={report.day}>
                                        <td>{report.day}</td>
                                        <td>{report.totalSales}</td>
                                        <td>{report.averageOrderValue}</td>
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

export default SalesByCategoryReport;