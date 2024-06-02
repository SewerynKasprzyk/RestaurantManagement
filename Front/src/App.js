import React, { useState } from 'react';
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap-grid.min.css"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from "./HomePage/Navbar";
import MenuItems from "./MenuPage/Menu";
import AppContent from "./AppContent";
import GenerateReport from "./Raport/Raport"
import Reservation  from "./ReservationPage/Reservation";
import AddReservation from "./ReservationPage/AddReservation";
import Ingredients from "./Ingredients";
import {EditMenuItems} from "./MenuItem";
import ReservationsReport from "./ReportPage/ReservationsReport";
import SalesByCategoryReport from "./ReportPage/SalesByCategoryReport";

// Główny komponent aplikacji
function App() {

    return (
    <BrowserRouter>
        <div>
            <div>
                <Navbar />
            </div>
            <Routes>
                <Route path="/menu" element = {<MenuItems/>} />
                <Route path="/loginTest" element={<AppContent />} />
                <Route path="/reservations" element={<Reservation />} />
                <Route path="/reservations/add" element={<AddReservation />} />
                <Route path="/loginTest" element={<AppContent/>} />
                <Route path="/ingredients" element={<Ingredients/>} />
                <Route path="/menuitem" element={<EditMenuItems/>} />
                <Route path="/reports/reservations" element={<ReservationsReport/>} />
                <Route path="/reports/sales-by-category" element={<SalesByCategoryReport/>} />
                <Route path="/raport" element = {<GenerateReport/>} />
            </Routes>
        </div>
    </BrowserRouter>
    );
}

export default App;
