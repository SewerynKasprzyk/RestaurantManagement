import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from "react-bootstrap";

export default function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Menu
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item as={Link} to="/menu">Menu</Dropdown.Item>
                                        <Dropdown.Item as={Link} to="/menuitem">Edycja Menu</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/loginTest">LoginTest2</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/ingredients">Składniki</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/reservations">Rezerwacje</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/reservations/history">Historia Rezerwacji</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
