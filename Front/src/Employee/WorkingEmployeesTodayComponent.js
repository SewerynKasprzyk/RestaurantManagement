import React, { useState, useEffect } from 'react';
import { request } from '../api/axiosConfig';

const WorkingEmployeesTodayComponent = () => {
    const [employeesWorkingToday, setEmployeesWorkingToday] = useState([]);
    const daysOfWeek = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
    const today = new Date().getDay();

    useEffect(() => {
        fetchEmployeesWorkingToday();
    }, []);

    const fetchEmployeesWorkingToday = async () => {
        try {
            const response = await request('get', '/api/employees/today-schedules');
            setEmployeesWorkingToday(response.data);
        } catch (error) {
            console.error('Error fetching employees working today:', error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        <div>
            <h2>Employees Working Today</h2>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Start Hour</th>
                    <th>End Hour</th>
                </tr>
                </thead>
                <tbody>
                {employeesWorkingToday.map(employee => (
                    <tr key={employee.id}>
                        <td>{employee.name}</td>
                        <td>{employee.surname}</td>
                        <td>{employee.timeSchedules.find(schedule => schedule.day === daysOfWeek[today])?.startHour}</td>
                        <td>{employee.timeSchedules.find(schedule => schedule.day === daysOfWeek[today])?.endHour}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default WorkingEmployeesTodayComponent;
