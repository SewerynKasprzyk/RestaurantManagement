import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

//TODO Dokończyć implementację dodawania rezerwacji gdy sesja użytkownika bedzie działać
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
                const user = await response.json();
                return user;
            } else {
                throw new Error('Błąd pobierania użytkownika');
            }
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    const fetchTableById = async (tableId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/tables/${tableId}`);
            if (response.ok) {
                const tableData = await response.json();
                return tableData;
            } else {
                throw new Error('Błąd pobierania stolika');
            }
        } catch (error) {
            console.error('Error:', error);
            return null;
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
        // Sprawdź, czy ID użytkownika jest prawidłowe (niepuste)
        if (userId) {
            // Pobierz użytkownika z bazy danych na podstawie ID
            fetchUserById(userId)
                .then(userData => {
                    setUser(userData); // Zaktualizuj stan użytkownika po pobraniu danych
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    }, [userId]); // Uruchom ten efekt, gdy zmieni się ID użytkownika

    // Efekt pobierający stolik po zmianie ID stolika
    useEffect(() => {
        if (tableId) {
            fetchTableById(tableId)
                .then(tableData => {
                    setTable(tableData); // Zaktualizuj stan stolika po pobraniu danych
                })
                .catch(error => {
                    console.error('Error:', error);
                });
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
            userId, // Użyj pobranego ID użytkownika
            tableId: table.id,
        };

        try {
            const response = await fetch('http://localhost:8080/api/reservations/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
                    <label>Data rezerwacji:</label>
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
