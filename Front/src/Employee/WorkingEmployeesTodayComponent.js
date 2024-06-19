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
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">
                            <h2>Employees Working Today</h2>
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Surname</th>
                                        <th>Start Hour</th>
                                        <th>End Hour</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employeesWorkingToday.map(employee => {
                                        const schedule = employee.timeSchedules.find(schedule => schedule.day === daysOfWeek[today]);
                                        return (
                                            <tr key={employee.id}>
                                                <td>{employee.name}</td>
                                                <td>{employee.surname}</td>
                                                <td>{schedule?.startHour}</td>
                                                <td>{schedule?.endHour}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkingEmployeesTodayComponent;
