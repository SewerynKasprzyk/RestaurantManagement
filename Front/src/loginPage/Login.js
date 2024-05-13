import React, { useState } from 'react';

// Komponent logowania
export function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
            .then(data => {
                onLogin(data.login);
                setError('');
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('Błąd logowania. Sprawdź swoje dane i spróbuj ponownie.');
            });
    };

    return (
        <div className='login-container'>
            <h2>Logowanie</h2>
            <input type="text" placeholder="Nazwa użytkownika" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <div className="error">{error}</div>}
            <button onClick={handleLogin}>Zaloguj</button>
        </div>
    );
}

// Komponent rejestracji
export function Register({ onRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

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
            .then(data => {
                onRegister(data.login);
                setError('');
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('Błąd rejestracji. Sprawdź swoje dane i spróbuj ponownie.');
            });
    };

    return (
        <div>
            <h2>Rejestracja</h2>
            <input type="text" placeholder="Nazwa użytkownika" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Hasło" value={password} onChange={(e) => setPassword(e.target.value)} />
            {error && <div className="error">{error}</div>}
            <button onClick={handleRegister}>Zarejestruj</button>
        </div>
    );
}
