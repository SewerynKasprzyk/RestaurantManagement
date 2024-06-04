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
                           <button className="btn btn-primary mb-3" onClick={fetchSales} disabled={loading}>
                               {loading ? 'Ładowanie...' : 'Generuj raport'}
                           </button>
                           <table className="table" style={{ textAlign: "center" }}>
                               <thead>
                                   <tr>
                                       <th>Kategoria</th>
                                       <th>Całkowita sprzedaż</th>
                                       <th>Ilość zamówień</th>
                                       <th>Średnia sprzedaż</th>
                                   </tr>
                               </thead>
                               <tbody>
                                   {sales.map(report => (
                                       <tr key={report.category}>
                                           <td>{report.category}</td>
                                           <td>{report.totalSales}</td>
                                           <td>{report.orderCount}</td>
                                           <td>{report.averageSale}</td>
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