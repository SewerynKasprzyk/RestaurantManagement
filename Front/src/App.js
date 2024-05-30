import React, {useEffect, useState} from 'react';
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap-grid.min.css"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from "./HomePage/Navbar";
import { Login, Register } from "./loginPage/Login";
import MenuItems from "./MenuPage/Menu";
import Ingredients from "./Ingredients";
import MenuItemForm from "./MenuItem";
import Reservation from "./ReservationPage/Reservation";
import AddReservation from "./ReservationPage/AddReservation";

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
                <Route path="/login" element= {<Login onLogin={handleLogin}/>} />
                <Route path="/register" element = {<Register onRegister = {handleRegister}/>} />
                <Route path="/ingredients" element = {<Ingredients/>} />
                <Route path="/menuitem" element = {<MenuItemForm/>} />
                <Route path="/reservations" element = {<Reservation/>} />
                <Route path="/reservation/add" element = {<AddReservation/>} />
            </Routes>
        </div>
    </BrowserRouter>
    );
}

export default App;
