import React, { useState } from 'react';

// Komponent logowania
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //zmienione metody logowania
    const handleLogin = () => {
        fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login: username, password: password }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Błąd logowania');
                }
            })
            .then(data => onLogin(data.login)) // Wywołanie funkcji onLogin
            .catch((error) => {
                console.error('Error:', error);
                alert('Błąd logowania. Sprawdź swoje dane i spróbuj ponownie.'); // Dodane powiadomienie o błędzie
            });
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

    //zmienione metody rejestracji bez reszty danych (do uzupelnienia)
    const handleRegister = () => {
        fetch('http://localhost:8080/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login: username, password: password }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Błąd rejestracji');
                }
            })
            .then(data => onRegister(data.login)) // Wywołanie funkcji onRegister
            .catch((error) => {
                console.error('Error:', error);
                alert('Błąd rejestracji. Sprawdź swoje dane i spróbuj ponownie.'); // Dodane powiadomienie o błędzie
            });
    };

  return (
    <div>
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
function App() {
  const [user, setUser] = useState(null); // Aktualnie zalogowany użytkownik
  const [menuItems, setMenuItems] = useState([
    { name: 'Pizza', price: '$10' },
    { name: 'Burger', price: '$8' },
    { name: 'Spaghetti', price: '$12' }
  ]); // Dostępne dania w menu

  const handleLogin = (username) => {
    // Tutaj możesz dodać logikę weryfikacji użytkownika (np. zapytanie do serwera)
    // Załóżmy, że po prostu ustawiamy zalogowanego użytkownika w stanie aplikacji
    setUser(username);
  };

  const handleRegister = (username) => {
    // Tutaj możesz dodać logikę rejestracji użytkownika (np. zapytanie do serwera)
    // Załóżmy, że po prostu ustawiamy zalogowanego użytkownika w stanie aplikacji
    setUser(username);
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Witaj, {user}!</h1>
          <Menu items={menuItems} />
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

export default App;
