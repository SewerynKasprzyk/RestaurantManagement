import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {getAuthToken, request} from '../api/axiosConfig';

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
    const token = getAuthToken(); // Replace this with the actual JWT token

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await request('GET', '/api/users/me', getAuthToken());

                if (response.status === 200) {
                    const userData = response.data;
                    setUserId(userData.id) // Adjust according to the UserDto field
                    setUser(userData)// Set the JWT token into local storage
                    //setAuthToken(response.data.token);
                } else {
                    console.error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };


        fetchUser();
    }, []);

    const fetchTableById = async (tableId) => {
        try {
            const response = await axios.get(`/api/tables/${tableId}`);
            setTable(response.data);
        } catch (error) {
            console.error('Error:', error);
            setError('Błąd pobierania stolika');
        }
    };

    const handleTableIdChange = (event) => {
        setTableId(event.target.value);
    };

    useEffect(() => {
        if (tableId) {
            fetchTableById(tableId);
        }
    }, [tableId]);

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
            user, // Użyj pełnego obiektu użytkownika
            tables: [table] // Użyj pełnego obiektu stolika, zakładając, że stolik może być tylko jeden
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