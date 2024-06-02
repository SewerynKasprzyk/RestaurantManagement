import React, { useState, useEffect } from 'react';
import { getAuthToken, request } from "../api/axiosConfig";

// Komponent wyświetlający rezerwacje
export default function Reservation() {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);

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

    useEffect(() => {
        const fetchReservations = async () => {
            if (user) {
                try {
                    const response = await request('GET', `/api/reservations/user/${user.id}`);

                    if (response.status === 200) {
                        setReservations(response.data);
                    } else {
                        console.error('Failed to fetch reservations');
                    }
                } catch (error) {
                    console.error('Error fetching reservations:', error);
                    setError('Błąd pobierania rezerwacji.');
                }
            }
        };

        fetchReservations();
    }, [user]);

    return (
        <div className='reservation-container'>
            <h2>Twoje rezerwacje</h2>
            <button onClick={() => window.location.href = '/reservations/add'}>Dodaj rezerwację</button>

            {error && <div className="error">{error}</div>}

            {reservations.length > 0 ? (
                <ul>
                    {reservations.map((reservation) => (
                        <li key={reservation.id}>
                            <p>Data: {reservation.reservationDate}</p>
                            <p>Godzina rozpoczęcia: {reservation.startHour}</p>
                            <p>Godzina zakończenia: {reservation.endHour}</p>
                            <p>Uwagi: {reservation.notes}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Brak rezerwacji</p>
            )}
        </div>
    );
}
