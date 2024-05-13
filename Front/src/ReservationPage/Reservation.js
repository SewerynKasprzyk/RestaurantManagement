import React, { useState, useEffect } from 'react';

// Komponent wyświetlający rezerwacje
export default function Reservation() {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/reservations')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Błąd pobierania rezerwacji');
                }
            })
            .then(data => {
                setReservations(data);
                setError('');
            })
            .catch((error) => {
                console.error('Error:', error);
                setError('Błąd pobierania rezerwacji. Spróbuj ponownie.');
            });
    }, []);

    return (
        <div className='reservation-container'>
            <h2>Twoje rezerwacje</h2>
            {reservations.map(reservation => (
                <div key={reservation.id} className='reservation'>
                    <div className='reservation-info'>
                        <div>{reservation.date}</div>
                        <div>{reservation.time}</div>
                        <div>{reservation.table}</div>
                    </div>
                </div>
            ))}
            {error && <div className="error">{error}</div>}
        </div>
    );
}