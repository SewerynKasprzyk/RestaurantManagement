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
       <div className="container" style={{marginTop:"1rem"}}>
           <div className="row justify-content-center">
               <div className="col-md-8">
                   <div className="card">
                       <div className="card-body">
                           <h2 className="card-title mb-3">Active Employees</h2>
                           <ul className="list-group">
                               {employees.map((employee) => (
                                   <li key={employee.id} className="list-group-item d-flex justify-content-between align-items-center">
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
                           <button className="btn btn-danger mt-3" onClick={handleDeactivateEmployee}>Delete Employee</button>
                       </div>
                   </div>
               </div>
           </div>
       </div>

    );
};

export default EmployeeList;
