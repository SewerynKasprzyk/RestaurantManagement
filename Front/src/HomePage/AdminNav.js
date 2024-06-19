import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from "react-bootstrap";

export default function AdminNav() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item" style={{marginRight:"0.5rem"}}>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Menu
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/menu">Menu</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/menuitem">Edit Menu</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>

                            <li className="nav-item" style={{marginRight:"0.5rem"}}>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Reservation Management
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/reservations">Add reservation</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/reservations/history">Reservations History</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/occupancy">Occupancy</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>

                            <li className="nav-item" style={{marginRight:"0.5rem"}}>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Report
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/reports/reservations">Reservation
                                            Report</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/reports/sales-by-category">Sales
                                            report</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/orders">Orders</Link>
                            </li>
                            <li className="nav-item">
                            </li>

                            <li className="nav-item" style={{marginRight:"0.5rem"}}>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Employee Management
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/employee">Add Employee</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/employeeList">Delete Employee</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/time-schedule">Time Schedule Management</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/time-schedule-today">Time Schedule</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="/ingredients">Storeroom</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/loginTest">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

    );
}