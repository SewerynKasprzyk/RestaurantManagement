import React from 'react';
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap-grid.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Orders from "./Order/Orders";
import AddOrder from "./Order/AddOrder";
import LiveReservation from "./LiveReservation/LiveReservation";
import EmployeeRegisterPage from './Employee/EmployeeRegisterPage';
import EmployeeList from "./Employee/EmployeeList";
import UserReservations from './ReservationPage/UserReservations';
import EditReservation from "./ReservationPage/EditReservation";
import Home from "./HomePage/Home";
import Occupancy from './ReservationPage/Occupancy';
import './globalStyles.css';
import TimeScheduleComponent from "./Employee/TimeScheduleComponent";


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
                        <Route path="/orders" element={<PrivateRoute element={<Orders />} roles={['ADMIN', 'EMPLOYEE']} />} />
                        <Route path="/orders/add" element={<PrivateRoute element={<AddOrder />} roles={['ADMIN', 'EMPLOYEE', 'CUSTOMER']} />} />
                        <Route path="/reservations/add" element={<PrivateRoute element={<AddReservation />} roles={['ADMIN', 'EMPLOYEE', 'CUSTOMER']} />} />
                        <Route path="/ingredients" element={<PrivateRoute element={<Ingredients />} roles={['ADMIN', 'EMPLOYEE']} />} />
                        <Route path="/menuitem" element={<PrivateRoute element={<EditMenuItems />} roles={['ADMIN', 'EMPLOYEE']} />} />
                        <Route path="/reports/reservations" element={<PrivateRoute element={<ReservationsReport />} roles={['ADMIN']} />} />
                        <Route path="/reports/sales-by-category" element={<PrivateRoute element={<SalesByCategoryReport />} roles={['ADMIN']} />} />
                        <Route path="/raport" element={<PrivateRoute element={<GenerateReport />} roles={['ADMIN', 'EMPLOYEE']} />} />
                        <Route path="/livereservation" element={<PrivateRoute element={<LiveReservation />} roles={['ADMIN']} />} />
                        <Route path="/employee" element={<PrivateRoute element={<EmployeeRegisterPage/>} roles={['ADMIN', 'EMPLOYEE']} />} />
                        <Route path="/employeeList" element={<PrivateRoute element={<EmployeeList/>} roles={['ADMIN', 'EMPLOYEE']} />} />
                        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
                        <Route path="" element = {<Home />} />
                        <Route path="/reservations/history" element={<PrivateRoute element={<UserReservations />} roles={['ADMIN', 'EMPLOYEE']} />} />
                        <Route path="/reservations/edit/:id" element={<PrivateRoute element={<EditReservation />} roles={['ADMIN', 'EMPLOYEE']} />} />
                        <Route path="/occupancy" element={<PrivateRoute element={<Occupancy />} roles={['ADMIN', 'EMPLOYEE']} />} />
                        <Route path="/time-schedule" element={<PrivateRoute element={<TimeScheduleComponent />} roles={['ADMIN']} />} />
                    </Routes>
                </div>
            </BrowserRouter>
    );
}

export default App;
