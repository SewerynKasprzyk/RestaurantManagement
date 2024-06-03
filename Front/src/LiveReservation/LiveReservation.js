import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function LiveReservation() {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        axios.get('/api/reservations/reservedTables')
            .then(response => {
                setTables(response.data);
                console.log(response.data);
                console.log(tables);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <div>
            <h1>Reserved Tables</h1>
            {tables.map((table, index) => (
                <div key={index}>
                    <h2>Table {table.id}</h2>
                    <p>Seats: {table.seatsAmount}</p>
                    <p>Start: {table.startTime}</p>
                    <p>End: {table.endTime}</p>
                </div>
            ))}
        </div>
    );
}

