import React, { useState, useEffect } from 'react';
import { request } from '../api/axiosConfig';

export default function UserReservations() {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await request('GET', '/api/users/all');
                if (response.status === 200) {
                    setUsers(response.data);
                } else {
                    console.error('Failed to fetch users');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        const fetchReservations = async () => {
            if (selectedUserId) {
                try {
                    const response = await request('GET', `/api/reservations/user/${selectedUserId}`);
                    if (response.status === 200) {
                        setReservations(response.data);
                    } else {
                        console.error('Failed to fetch reservations');
                    }
                } catch (error) {
                    console.error('Error fetching reservations:', error);
                }
            }
        };

        fetchReservations();
    }, [selectedUserId]);

    const handleUserSelect = (e) => {
        setSelectedUserId(e.target.value);
        //show username in console log
        console.log(e.target.options[e.target.selectedIndex].text);
    };

    return (
        <div>
            <select onChange={handleUserSelect} value={selectedUserId}>
                <option value="" disabled>Select a user</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>

            {reservations.map((reservation) => (
                <div key={reservation.id}>
                    {reservations.map((reservation) => (
                        <div key={reservation.id}>
                            <h3>Rezerwacja {reservation.id}</h3>
                            <p>Data: {reservation.reservationDate}</p>
                            <p>Godzina rozpoczęcia: {reservation.startHour}</p>
                            <p>Godzina zakończenia: {reservation.endHour}</p>
                            <p>Uwagi: {reservation.notes}</p>
                            <p>Stoliki: {reservation.tables.map(table => `Stolik ${table.id}`).join(', ')}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}