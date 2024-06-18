import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { request } from '../api/axiosConfig'; // Usunięto nieużywaną funkcję getAuthToken

export default function AddReservation() {
    const [reservationDate, setReservationDate] = useState('');
    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const [notes, setNotes] = useState('');
    const [user, setUser] = useState(null);
    const [availableTables, setAvailableTables] = useState([]);
    const [selectedTables, setSelectedTables] = useState([]);
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

        fetchUser();
    }, []);

    const fetchAvailableTables = async (startTime, endTime) => {
        try {
            const response = await axios.get('/api/reservations/freeTables', {
                params: {
                    reservationDate,
                    startHour: startTime,
                    endHour: endTime
                }
            });
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

    const handleAddTable = (tableId) => {
        const selectedTable = availableTables.find(table => table.id === tableId);
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

        // Dodajemy sprawdzenie, czy wybrano jakikolwiek stolik
        if (selectedTables.length === 0) {
            setError('Nie można dodać rezerwacji bez wybranego stolika.');
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
                navigate('/reservations');
            } else {
                throw new Error('Błąd dodawania rezerwacji');
            }
        } catch (error) {
            setError('Błąd dodawania rezerwacji. Spróbuj ponownie.');
        }
    };

    const handleStartHourChange = (event) => {
        const startTime = event.target.value;
        setStartHour(startTime);
        if (endHour) {
            fetchAvailableTables(startTime, endHour);
        }
    };

    const handleEndHourChange = (event) => {
        const endTime = event.target.value;
        setEndHour(endTime);
        if (startHour) {
            fetchAvailableTables(startHour, endTime);
        }
    };

    return (
        <div className="container" style={{ marginTop: "1rem" }}>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title mb-3">Dodaj rezerwację</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Data rezerwacji:</label>
                                    <input
                                        type='date'
                                        className="form-control"
                                        value={reservationDate}
                                        onChange={(event) => setReservationDate(event.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Godzina rozpoczęcia:</label>
                                    <input
                                        type='time'
                                        className="form-control"
                                        value={startHour}
                                        onChange={handleStartHourChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Godzina zakończenia:</label>
                                    <input
                                        type='time'
                                        className="form-control"
                                        value={endHour}
                                        onChange={handleEndHourChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Uwagi:</label>
                                    <input
                                        type='text'
                                        className="form-control"
                                        value={notes}
                                        onChange={(event) => setNotes(event.target.value)}
                                    />
                                </div>
                                <div>
                                    <h3>Wybierz stolik:</h3>
                                    <div className="table-selection">
                                        {availableTables.map((table) => (
                                            <div
                                                key={table.id}
                                                className={`table-item ${selectedTables.some(selectedTable => selectedTable.id === table.id) ? 'selected' : ''}`}
                                                onClick={() => handleAddTable(table.id)}
                                                style={{ cursor: 'pointer', border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginRight: '10px', marginBottom: '10px' }}
                                            >
                                                <p>{`Stolik ${table.id}`}</p>
                                                <p>Liczba miejsc: {table.seatsAmount}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3>Wybrane stoliki:</h3>
                                    {selectedTables.map((table) => (
                                        <div key={table.id} className="mb-2">
                                            <p>{`Stolik ${table.id}: Liczba miejsc przy stoliku: ${table.seatsAmount || 'Brak opisu'}`}</p>
                                            <button type="button" className="btn btn-danger" onClick={() => handleRemoveTable(table.id)}>Usuń</button>
                                        </div>
                                    ))}
                                </div>
                                <button type='submit' className="btn btn-success mt-3">Dodaj rezerwację</button>
                            </form>
                            {error && <div className="error mt-3">{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
