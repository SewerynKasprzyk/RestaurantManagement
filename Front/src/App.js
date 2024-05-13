import React, { useState } from 'react';
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap-grid.min.css"
import Navbar from "./HomePage/Navbar";
import { Login, Register } from "./loginPage/Login";
import MenuItems from "./MenuPage/Menu";

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
        <div>
            <div>
                <Navbar />
            </div>
            {user ? (
                <div>
                    <h1>Witaj, {user}!</h1>
                    <MenuItems />
                </div>
            ) : (
                <div>
                    <Login onLogin={handleLogin} />
                    <Register onRegister={handleRegister} />
                </div>
            )}
        </div>
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
