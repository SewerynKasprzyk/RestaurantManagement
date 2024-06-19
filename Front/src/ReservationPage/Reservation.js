import React, { useState, useEffect } from 'react';
import { getAuthToken, request } from "../api/axiosConfig";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as availableTables from "react-bootstrap/ElementChildren";

export default function Reservation() {
    const [reservations, setReservations] = useState([]);
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const navigate = useNavigate();
    const [availableTables, setAvailableTables] = useState([]);


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

    const handleEdit = (id) => {
        navigate(`/reservations/edit/${id}`);
    }

    return (
       <div>
           <h2 className="mb-3">Your reservations</h2>
           <button className="btn btn-primary mb-3" onClick={() => window.location.href = '/reservations/add'}>Add reservation</button>

            {error && <div className="alert alert-danger">{error}</div>}

           <div className="row">
               {reservations.length > 0 ? (
                   reservations.map((reservation) => (
                       <div key={reservation.id} className="col-md-4 mb-4">
                           <div className="card">
                               <div className="card-body">
                                   <p className="card-text">Date: {reservation.reservationDate}</p>
                                   <p className="card-text">Start hour: {reservation.startHour}</p>
                                   <p className="card-text">End hour: {reservation.endHour}</p>
                                   <p className="card-text">Selected tables: {reservation.tables.map(table => `Table ${table.id}`).join(', ')}</p>
                                   <p className="card-text">Additional info: {reservation.notes}</p>
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