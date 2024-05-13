import React, { useState } from 'react';
import '../App.css';

// Komponent logowania
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onLogin(username);
  };

  return (
    <div className='login-container'>
      <h2>Logowanie</h2>
      <input type="text" placeholder="Nazwa użytkownika" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Zaloguj</button>
    </div>
  );
}

// Komponent rejestracji
function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    onRegister(username);
  };

  return (
    <div className="login-container">
      <h2>Rejestracja</h2>
      <input type="text" placeholder="Nazwa użytkownika" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Zarejestruj</button>
    </div>
  );
}

// Komponent menu
function Menu({ items }) {
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

// Główny komponent aplikacji
function LoginPage() {
  const [user, setUser] = useState(null); // Aktualnie zalogowany użytkownik
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuItems, setMenuItems] = useState([
    { name: 'Pizza', price: '$10' },
    { name: 'Burger', price: '$8' },
    { name: 'Spaghetti', price: '$12' }
  ]);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleRegister = (username) => {
    setUser(username);
  };

    const handleMenuClick = (menuVisible) => {
    setMenuVisible(!menuVisible);
    };

  return (
    <div className="box">
          <div className="login-section">
          <Login onLogin={handleLogin} />
          <Register onRegister={handleRegister} />
          </div>
          <div className="menu-show">
          <button onClick={()=>handleMenuClick(menuVisible)} >Pokaż menu</button>
          {menuVisible && <Menu items={menuItems} />}
          <p>loginpage</p>
          </div>
    </div>
  );
}

export default LoginPage;
