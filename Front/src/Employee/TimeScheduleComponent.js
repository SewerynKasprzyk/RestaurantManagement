import React, { useState, useEffect } from 'react';
import {request} from "../api/axiosConfig";

const TimeScheduleComponent = () => {
    const [day, setDay] = useState('');
    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const [employees, setEmployees] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');

    useEffect(() => {
        fetchActiveEmployees();
    }, []);

    const fetchActiveEmployees = async () => {
        try {
            const response = await request('get', '/api/users/activeEmployees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching active employees:', error);
            // Handle error (e.g., show an error message)
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await request('post', '/api/time-schedules', {
                day: day.toUpperCase(),
                startHour: startHour,
                endHour: endHour,
                userId: parseInt(selectedUserId) // Assuming userId is the property name in your backend
            });

            console.log('Schedule created:', response.data);
            // Optionally, redirect to another page or show a success message
        } catch (error) {
            console.error('Error creating schedule:', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div>
            <h2>Add New Schedule</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Day:</label>
                    <select
                        value={day}
                        onChange={(e) => setDay(e.target.value)}
                        required
                    >
                        <option value="">Select Day</option>
                        <option value="MONDAY">Monday</option>
                        <option value="TUESDAY">Tuesday</option>
                        <option value="WEDNESDAY">Wednesday</option>
                        <option value="THURSDAY">Thursday</option>
                        <option value="FRIDAY">Friday</option>
                        <option value="SATURDAY">Saturday</option>
                        <option value="SUNDAY">Sunday</option>
                    </select>
                </div>
                <div>
                    <label>Start Hour:</label>
                    <input
                        type="time"
                        value={startHour}
                        onChange={(e) => setStartHour(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>End Hour:</label>
                    <input
                        type="time"
                        value={endHour}
                        onChange={(e) => setEndHour(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Select Employee:</label>
                    <select
                        value={selectedUserId}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                        required
                    >
                        <option value="">Select Employee</option>
                        {employees.map(employee => (
                            <option key={employee.id} value={employee.id}>{employee.name} {employee.surname}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Add Schedule</button>
            </form>
        </div>
    );
};

export default TimeScheduleComponent;
