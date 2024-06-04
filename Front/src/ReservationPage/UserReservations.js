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
       <div className="row">
           <div className="col">

               <select className="form-select mb-3 " onChange={handleUserSelect} value={selectedUserId}  style={{ maxWidth: "300px", marginTop:"1rem", marginLeft: "1rem" }}>
                   <option value="" disabled>Select a user</option>
                   {Array.isArray(users) && users.map((user) => (
                       <option key={user.id} value={user.id}>
                           {user.name}
                       </option>
                   ))}
               </select>
           </div>
       </div>

       <div className="row">
           {reservations.map((reservation) => (
               <div key={reservation.id} className="col-md-4 mb-4">
                   <div className="card">
                       <div className="card-body">
                           <h3 className="card-title">Rezerwacja {reservation.id}</h3>
                           <p className="card-text">Data: {reservation.reservationDate}</p>
                           <p className="card-text">Godzina rozpoczęcia: {reservation.startHour}</p>
                           <p className="card-text">Godzina zakończenia: {reservation.endHour}</p>
                           <p className="card-text">Uwagi: {reservation.notes}</p>
                           <p className="card-text">Stoliki: {reservation.tables.map(table => `Stolik ${table.id}`).join(', ')}</p>
                       </div>
                   </div>
               </div>
           ))}
       </div>
    </div>
    );
}