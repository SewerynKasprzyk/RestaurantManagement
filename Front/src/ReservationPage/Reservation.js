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
       <div>
           <h2 className="mb-3">Twoje rezerwacje</h2>
           <button className="btn btn-primary mb-3" onClick={() => window.location.href = '/reservations/add'}>Dodaj rezerwację</button>

           {error && <div className="alert alert-danger">{error}</div>}

           <div className="row">
               {reservations.length > 0 ? (
                   reservations.map((reservation) => (
                       <div key={reservation.id} className="col-md-4 mb-4">
                           <div className="card">
                               <div className="card-body">
                                   <p className="card-text">Data: {reservation.reservationDate}</p>
                                   <p className="card-text">Godzina rozpoczęcia: {reservation.startHour}</p>
                                   <p className="card-text">Godzina zakończenia: {reservation.endHour}</p>
                                   <p className="card-text">Uwagi: {reservation.notes}</p>
                               </div>
                           </div>
                       </div>
                   ))
               ) : (
                   <p>Brak rezerwacji</p>
               )}
           </div>
       </div>


    );
}
