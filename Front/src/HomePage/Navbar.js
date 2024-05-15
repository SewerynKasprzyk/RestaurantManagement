import React from 'react'
import {Link} from 'react-router-dom'

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
                               <Link className="nav-link" to="/menu">Menu</Link>
                            </li>
                            <li className="nav-item">
                               <Link className="nav-link" to="/login">Logowanie</Link>
                            </li>
                            <li className="nav-item">
                               <Link className="nav-link" to="/register">Rejestracja</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/ingredients">Składniki</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/menuitem">Edycja Menu</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/reservations">Rezerwacje</Link>
                            </li>
                        </ul>
                    </div>


                </div>
            </nav>

        </div>
    )
}