import React, { useState } from 'react';
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap-grid.min.css"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from "./HomePage/Navbar";
import MenuItems from "./MenuPage/Menu";
import AppContent from "./AppContent";
import Reservation  from "./ReservationPage/Reservation";
import AddReservation from "./ReservationPage/AddReservation";
import Ingredients from "./Ingredients";
import {EditMenuItems} from "./MenuItem";

// Główny komponent aplikacji
function App() {
    const [user, setUser] = useState(null); // Aktualnie zalogowany użytkownik


    const handleLogin = (username) => {
        setUser(username);
    };

    const handleRegister = (username) => {
        setUser(username);
    };

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
            </Routes>
        </div>
    </BrowserRouter>
    );
}

// Komponent menu
function MenuIt({ items }) {
    return (
        <div>
            <h2>Menu</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.name} - {item.price}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
