import React, { useState, useEffect } from 'react';
import { request } from "../api/axiosConfig";

const TimeScheduleComponent = () => {
    const [day, setDay] = useState('');
    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const [employees, setEmployees] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');
    const [userSchedules, setUserSchedules] = useState([]);

    useEffect(() => {
        fetchActiveEmployees();
    }, []);

    useEffect(() => {
        if (selectedUserId) {
            fetchUserSchedules(selectedUserId);
        } else {
            setUserSchedules([]); // Reset schedules if no user is selected
        }
    }, [selectedUserId]);

    const fetchActiveEmployees = async () => {
        try {
            const response = await request('get', '/api/users/activeEmployees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching active employees:', error);
            // Handle error (e.g., show an error message)
        }
    };

    const fetchUserSchedules = async (userId) => {
        try {
            const response = await request('get', `/api/time-schedules/user/${userId}`);
            const sortedSchedules = sortSchedules(response.data);
            setUserSchedules(sortedSchedules);
        } catch (error) {
            console.error('Error fetching user schedules:', error);
            // Handle error (e.g., show an error message)
        }
    };

    const sortSchedules = (schedules) => {
        // Define the order of days in the week
        const dayOrder = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'];

        // Sort schedules based on the predefined order of days
        schedules.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

        return schedules;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await request('post', '/api/time-schedules', {
                day: day.toUpperCase(),
                startHour: startHour,
                endHour: endHour,
                userId: parseInt(selectedUserId) // Ensures userId is an integer
            });

            console.log('Schedule created or updated:', response.data);
            fetchUserSchedules(selectedUserId); // Refresh the user's schedules
            setDay('');
            setStartHour('');
            setEndHour('');
        } catch (error) {
            console.error('Error creating or updating schedule:', error);
            // Optionally, handle the error (e.g., show an error message)
        }
    };

    // Handle case where employees is not yet fetched or empty
    if (!employees || employees.length === 0) {
        return <div>Loading...</div>; // You can show a loading indicator here
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card mb-3">
                        <div className="card-body">
                            <label htmlFor="employeeSelect">Select Employee:</label>
                            <select
                                id="employeeSelect"
                                className="form-select"
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
                    </div>

                    {selectedUserId && (
                        <div className="card mb-3">
                            <div className="card-body">
                                <h3>Time Schedule for
                                    user: {employees.find(emp => emp.id === parseInt(selectedUserId))?.name}</h3>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Day</th>
                                            <th>Start Hour</th>
                                            <th>End Hour</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userSchedules.map(schedule => (
                                            <tr key={schedule.id}>
                                                <td>{schedule.day}</td>
                                                <td>{schedule.startHour}</td>
                                                <td>{schedule.endHour}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    <div className="card">
                        <div className="card-header">
                            <h2>Add New Schedule</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="daySelect" className="form-label">Day:</label>
                                    <select
                                        id="daySelect"
                                        className="form-select"
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
                                <div className="mb-3">
                                    <label htmlFor="startHour" className="form-label">Start Hour:</label>
                                    <input
                                        type="time"
                                        id="startHour"
                                        className="form-control"
                                        value={startHour}
                                        onChange={(e) => setStartHour(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="endHour" className="form-label">End Hour:</label>
                                    <input
                                        type="time"
                                        id="endHour"
                                        className="form-control"
                                        value={endHour}
                                        onChange={(e) => setEndHour(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Add Schedule</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeScheduleComponent;
