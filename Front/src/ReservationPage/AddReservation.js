import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

//TODO Dokończyć implementację dodawania rezerwacji gdy sesja użytkownika bedzie działać
export default function AddReservation() {
    const [reservationDate, setReservationDate] = useState('');
    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const [notes, setNotes] = useState('');
    const [user, setUser] = useState('');
    const [tables, setTable] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const reservation = {
            reservationDate,
            startHour,
            endHour,
            reserved: true,
            notes,
            user,
            tables
            //user: { id: user }, // Uzytkownik zalogowany o podanym ID
            //tables: tables.split(',').map(table => ({ id: table.trim() })) // Zakładając, że tables to lista ID oddzielonych przecinkami

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
                    <label>Użytkownik:</label>
                    <input
                        type='text'
                        value={user}
                        onChange={(event) => setUser(event.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Stoliki:</label>
                    <input
                        type='text'
                        value={tables}
                        onChange={(event) => setTable(event.target.value)}
                        required
                    />
                </div>
                <button type='submit'>Dodaj rezerwację</button>
            </form>
            {error && <div className="error">{error}</div>}
        </div>
    );
}
