import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getAuthToken, request } from "../api/axiosConfig";

const Occupancy = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState(null);
    const [fetch, setFetch] = useState(false);

    const fetchReservations = async () => {
        try {
            const authToken = getAuthToken();
            const response = await request('GET', `/api/reservations/reservations/${selectedDate.toISOString().split('T')[0]}`);
            if (response.status === 200) {
                setReservations(response.data);
            } else {
                console.error('Failed to fetch reservations');
            }
        } catch (error) {
            console.error('Error fetching reservations:', error);
            setError('Błąd pobierania rezerwacji.');
        } finally {
            setFetch(false);
        }
    }

    if (fetch) {
        fetchReservations();
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-center">
                <h1 className="mb-3" style={{color: 'white', textShadow: '2px 2px 2px #000000'}}>Occupancy</h1>
            </div>
            <div className="d-flex justify-content-center">
                <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} className="form-control mb-3" />
            </div>
            <div className="d-flex justify-content-center">
                <button className="btn btn-primary mb-3" onClick={() => setFetch(true)}>Pokaż rezerwacje</button>
                {error && <div className="alert alert-danger">{error}</div>}
            </div>

            <div className="row">
                {reservations.map(reservation => (
                    <div key={reservation.id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <p className="card-text">Data: {reservation.reservationDate}</p>
                                <p className="card-text">Godzina rozpoczęcia: {reservation.startHour}</p>
                                <p className="card-text">Godzina zakończenia: {reservation.endHour}</p>
                                <p className="card-text">Zarezerwowane stoliki: {reservation.tables.map(table => `Stolik ${table.id}`).join(', ')}</p>
                                {reservation.user && <p className="card-text">Imię użytkownika: {reservation.user.name}</p>}
                                {reservation.user && <p className="card-text">Nazwisko użytkownika: {reservation.user.surname}</p>}
                                <p className="card-text">Uwagi: {reservation.notes}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Occupancy;