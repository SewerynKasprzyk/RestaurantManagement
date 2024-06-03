import React from 'react';
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap-grid.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./HomePage/Navbar";
import MenuItems from "./MenuPage/Menu";
import AppContent from "./AppContent";
import GenerateReport from "./Raport/Raport";
import Reservation from "./ReservationPage/Reservation";
import AddReservation from "./ReservationPage/AddReservation";
import Ingredients from "./Ingredients";
import { EditMenuItems } from "./MenuItem";
import ReservationsReport from "./ReportPage/ReservationsReport";
import SalesByCategoryReport from "./ReportPage/SalesByCategoryReport";
import NavBarControl from "./NavBarControl";
import PrivateRoute from './PrivateRoute';
import UserReservations from './ReservationPage/UserReservations';

// Main application component
function App() {
    return (
            <BrowserRouter>
                <div>
                    <NavBarControl />
                    <Routes>
                        <Route path="/menu" element = {<MenuItems/>} />
                        <Route path="/loginTest" element={<AppContent />} />
                        <Route path="/reservations" element={<PrivateRoute element={<Reservation />} roles={['ADMIN', 'EMPLOYEE', 'CUSTOMER']} />} />
                        <Route path="/reservations/add" element={<PrivateRoute element={<AddReservation />} roles={['ADMIN', 'EMPLOYEE', 'CUSTOMER']} />} />
                        <Route path="/ingredients" element={<PrivateRoute element={<Ingredients />} roles={['ADMIN', 'EMPLOYEE']} />} />
                        <Route path="/menuitem" element={<PrivateRoute element={<EditMenuItems />} roles={['ADMIN', 'EMPLOYEE']} />} />
                        <Route path="/reports/reservations" element={<PrivateRoute element={<ReservationsReport />} roles={['ADMIN']} />} />
                        <Route path="/reports/sales-by-category" element={<PrivateRoute element={<SalesByCategoryReport />} roles={['ADMIN']} />} />
                        <Route path="/raport" element={<PrivateRoute element={<GenerateReport />} roles={['ADMIN', 'EMPLOYEE']} />} />
                        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
                        <Route path="/reservations/history" element={<PrivateRoute element={<UserReservations />} roles={['ADMIN', 'EMPLOYEE']} />} />
                    </Routes>
                </div>
            </BrowserRouter>
    );
}

export default App;
