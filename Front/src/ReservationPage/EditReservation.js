import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuthToken, request } from "../api/axiosConfig";
import {useNavigate, useParams} from 'react-router-dom';
import * as availableTables from "react-bootstrap/ElementChildren";

export default function EditReservation() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reservation, setReservation] = useState(null);
    const [formData, setFormData] = useState({ reservationDate: '', startHour: '', endHour: '', notes: '', reserved: true, user: null });
    const [availableTables, setAvailableTables] = useState([]);
    const [selectedTables, setSelectedTables] = useState([]);

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const response = await request('GET', `/api/reservations/${id}`);
                if (response.status === 200) {
                    const reservationData = response.data;
                    setReservation(reservationData);
                    setFormData({
                        reservationDate: reservationData.reservationDate,
                        startHour: reservationData.startHour,
                        endHour: reservationData.endHour,
                        notes: reservationData.notes,
                        reserved: reservationData.reserved,
                        user: reservationData.user
                    });
                    setSelectedTables(reservationData.tables);
                } else {
                    console.error('Failed to fetch reservation data');
                }
            } catch (error) {
                console.error('Error fetching reservation:', error);
            }
        };

        fetchReservation();
    }, [id]);

    useEffect(() => {
        const fetchAvailableTables = async () => {
            try {
                const response = await axios.get('/api/reservations/freeTables', {
                    params: {
                        reservationDate: formData.reservationDate,
                        startHour: formData.startHour,
                        endHour: formData.endHour
                    }
                });
                if (response.status === 200) {
                    setAvailableTables(response.data);
                } else {
                    console.error('Failed to fetch tables');
                }
            } catch (error) {
                console.error('Error fetching tables:', error);
            }
        };

        if (formData.startHour && formData.endHour) {
            fetchAvailableTables();
        }
    }, [formData.startHour, formData.endHour, formData.reservationDate]);

    const handleInputChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    const handleTableSelect = (event) => {
        const selectedTableId = event.target.value;
        const selectedTable = availableTables.find(table => table.id === parseInt(selectedTableId, 10));
        if (selectedTable && !selectedTables.some(table => table.id === selectedTable.id)) {
            setSelectedTables([...selectedTables, selectedTable]);
        }
    };

    const handleRemoveTable = (tableId) => {
        setSelectedTables(selectedTables.filter(table => table.id !== tableId));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const reservation = {
            ...formData,
            tables: selectedTables
        };

        try {
            const response = await request('PUT', `/api/reservations/${id}`, reservation);
            if (response.status === 200) {
                navigate('/reservations');
            } else {
                console.error('Failed to update reservation');
            }
        } catch (error) {
            console.error('Error updating reservation:', error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await request('delete', `/api/reservations/${id}`);
            if (response.status === 204) {
                navigate('/');
            } else {
                throw new Error('Błąd usuwania rezerwacji');
            }
        } catch (error) {
            setError('Błąd usuwania rezerwacji. Spróbuj ponownie.');
        }
    };


    return (
        <div className='edit-reservation-container'>
            <h2>Edytuj rezerwację</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Data rezerwacji:</label>
                    <input
                        type='date'
                        name='reservationDate'
                        value={formData.reservationDate}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Godzina rozpoczęcia:</label>
                    <input
                        type='time'
                        name='startHour'
                        value={formData.startHour}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Godzina zakończenia:</label>
                    <input
                        type='time'
                        name='endHour'
                        value={formData.endHour}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label>Uwagi:</label>
                    <input
                        type='text'
                        name='notes'
                        value={formData.notes}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Wybierz stolik:</label>
                    <select onChange={handleTableSelect}>
                        <option value="" disabled>Wybierz stolik</option>
                        {availableTables.map((table) => (
                            <option key={table.id} value={table.id}>
                                {`Stolik ${table.id} : ${table.seatsAmount}`}
                            </option>
                        ))}
                    </select>
                    <button type="button" onClick={handleTableSelect}>Dodaj stolik</button>
                </div>
                <div>
                    <h3>Wybrane stoliki:</h3>
                    {selectedTables.map((table) => (
                        <div key={table.id}>
                            <p>{`Stolik ${table.id}: Liczba miejsc przy stoliku: ${table.seatsAmount || 'No description'}`}</p>
                            <button type="button" onClick={() => handleRemoveTable(table.id)}>Usuń</button>
                        </div>
                    ))}
                </div>
                <button type='submit'>Zaktualizuj rezerwację</button>
                <button type='button' onClick={handleDelete}>Usuń rezerwację</button>
            </form>
        </div>
    );
}