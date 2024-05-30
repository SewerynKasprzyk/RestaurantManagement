import React, { useState } from 'react';
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap-grid.min.css"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from "./HomePage/Navbar";
import { Login, Register } from "./loginPage/Login";
import MenuItems from "./MenuPage/Menu";
import AppContent from "./AppContent";
import GenerateReport from "./Raport/Raport"

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
                <AppContent />
            </div>
            <Routes>
                <Route path="/menu" element = {<MenuItems/>} />
                <Route path="/login" element= {<Login onLogin={handleLogin}/>} />
                <Route path="/register" element = {<Register onRegister = {handleRegister}/>} />
                <Route path="/raport" element = {<GenerateReport/>} />
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
