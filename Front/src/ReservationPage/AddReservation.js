import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { getAuthToken, request } from '../api/axiosConfig';

export default function AddReservation() {
    const [reservationDate, setReservationDate] = useState('');
    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const [notes, setNotes] = useState('');
    const [user, setUser] = useState(null);
    const [availableTables, setAvailableTables] = useState([]);
    const [selectedTables, setSelectedTables] = useState([]);
    const [selectedTableId, setSelectedTableId] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await request('GET', '/api/users/me');
                if (response.status === 200) {
                    const userData = response.data;
                    setUser(userData);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchAvailableTables = async () => {
            try {
                const response = await axios.get('/api/tables');
                if (response.status === 200) {
                    setAvailableTables(response.data);
                } else {
                    console.error('Failed to fetch tables');
                }
            } catch (error) {
                console.error('Error fetching tables:', error);
                setError('Błąd pobierania stolików.');
            }
        };

        fetchUser();
        fetchAvailableTables();
    }, []);

    const handleAddTable = () => {
        const selectedTable = availableTables.find(table => table.id === parseInt(selectedTableId, 10));
        if (selectedTable && !selectedTables.some(table => table.id === selectedTable.id)) {
            setSelectedTables([...selectedTables, selectedTable]);
        }
    };

    const handleRemoveTable = (tableId) => {
        setSelectedTables(selectedTables.filter(table => table.id !== tableId));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!user) {
            setError('Nie można dodać rezerwacji bez zalogowanego użytkownika.');
            return;
        }

        const reservation = {
            reservationDate,
            startHour,
            endHour,
            reserved: true,
            notes,
            user,
            tables: selectedTables
        };

        try {
            const response = await request('post', '/api/reservations/add', reservation);
            if (response.status === 200) {
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
                    <label>Wybierz stolik:</label>
                    <select onChange={(e) => setSelectedTableId(e.target.value)} value={selectedTableId}>
                        <option value="" disabled>Wybierz stolik</option>
                        {availableTables.map((table) => (
                            <option key={table.id} value={table.id}>
                                {`Stolik ${table.id} : ${table.seatsAmount}`}
                            </option>
                        ))}
                    </select>
                    <button type="button" onClick={handleAddTable} disabled={!selectedTableId}>Dodaj stolik</button>
                </div>
                <div>
                    <h3>Wybrane stoliki:</h3>
                    {selectedTables.map((table) => (
                        <div key={table.id}>
                            <p>{`Stolik ${table.id}: Liczba miejsc przy stoliku: ${table.seatsAmount || 'Brak opisu'}`}</p>
                            <button type="button" onClick={() => handleRemoveTable(table.id)}>Usuń</button>
                        </div>
                    ))}
                </div>
                <button type='submit'>Dodaj rezerwację</button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
}
