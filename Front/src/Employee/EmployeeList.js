import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        fetchActiveEmployees();
    }, []);

    const fetchActiveEmployees = async () => {
        try {
            const response = await axios.get('/api/users/activeEmployees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching active employees:', error);
        }
    };

    const handleSelectEmployee = (employeeId) => {
        setSelectedEmployee(employeeId);
    };

    const handleDeactivateEmployee = async () => {
        if (!selectedEmployee) return; // No employee selected
        try {
            await axios.put(`/api/users/${selectedEmployee}/setInactive`);
            // Optionally, update the UI to reflect the change
            fetchActiveEmployees();
            setSelectedEmployee(null);
        } catch (error) {
            console.error('Error deactivating employee:', error);
        }
    };

    return (
        <div>
            <h2>Active Employees</h2>
            <ul>
                {employees.map((employee) => (
                    <li key={employee.id}>
                        <input
                            type="radio"
                            name="employee"
                            value={employee.id}
                            checked={selectedEmployee === employee.id}
                            onChange={() => handleSelectEmployee(employee.id)}
                        />
                        {employee.name}
                    </li>
                ))}
            </ul>
            <button onClick={handleDeactivateEmployee}>Delete Employee</button>
        </div>
    );
};

export default EmployeeList;
