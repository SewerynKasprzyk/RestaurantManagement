import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddReservation() {
    const [reservationDate, setReservationDate] = useState('');
    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const [notes, setNotes] = useState('');
    const [userId, setUserId] = useState(''); // Stan przechowujący ID użytkownika
    const [user, setUser] = useState(null); // Stan przechowujący dane użytkownika
    const [tableId, setTableId] = useState(''); // Stan przechowujący ID stolika
    const [table, setTable] = useState(null); // Stan przechowujący dane stolika
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchUserById = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${userId}`); // Zakładając, że masz ścieżkę /api/users/:id, która zwraca użytkownika po ID
            if (response.ok) {
                const userData = await response.json();
                setUser(userData);
            } else {
                throw new Error('Błąd pobierania użytkownika');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Błąd pobierania użytkownika');
        }
    };

    const fetchTableById = async (tableId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/tables/${tableId}`);
            if (response.ok) {
                const tableData = await response.json();
                return setTable(tableData);
            } else {
                throw new Error('Błąd pobierania stolika');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Błąd pobierania stolika');
        }
    };

    const handleUserIdChange = (event) => {
        setUserId(event.target.value);
    };

    const handleTableIdChange = (event) => {
        setTableId(event.target.value);
    };

    // Efekt pobierający użytkownika po zmianie ID użytkownika
    useEffect(() => {
        if (userId) {
            fetchUserById(userId);
        }
    }, [userId]);

    useEffect(() => {
        if (tableId) {
            fetchTableById(tableId);
        }
    }, [tableId]);


    const handleSubmit = async (event) => {
        event.preventDefault();

        const reservation = {
            reservationDate,
            startHour,
            endHour,
            reserved: true,
            notes,
            user, // Użyj pełnego obiektu użytkownika
            tables: [table] // Użyj pełnego obiektu stolika, zakładając, że stolik może być tylko jeden
        };

        try {
            const response = await fetch('http://localhost:8080/api/reservations/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${yourAuthToken}`, // Dodaj token autoryzacyjny
                },
                body: JSON.stringify(reservation),
            });

            if (response.ok) {
                navigate('/');
            } else {
                throw new Error('Błąd dodawania rezerwacji');
            }
        } catch (error) {
            setError('Błąd dodawania rezerwacji. Spróbuj ponownie.');
        }
    };

    return (
        <div className='add-reservation-container'>
            <h2>Dodaj rezerwację</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Data rezerwacji:</label>\
                    <input
                        type='date'
                        value={reservationDate}
                        onChange={(event) => setReservationDate(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Godzina rozpoczęcia:</label>
                    <input
                        type='time'
                        value={startHour}
                        onChange={(event) => setStartHour(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Godzina zakończenia:</label>
                    <input
                        type='time'
                        value={endHour}
                        onChange={(event) => setEndHour(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Uwagi:</label>
                    <input
                        type='text'
                        value={notes}
                        onChange={(event) => setNotes(event.target.value)}
                    />
                </div>
                <div>
                    <label>Użytkownik (ID):</label>
                    <input
                        type='number'
                        value={userId}
                        onChange={handleUserIdChange}
                        required
                    />
                </div>
                <div>
                    <label>ID stolika:</label>
                    <input
                        type='number'
                        value={tableId}
                        onChange={handleTableIdChange}
                        required
                    />
                </div>
                <button type='submit'>Dodaj rezerwację</button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
}
