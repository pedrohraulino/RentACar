import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation(); // Obtém a URL atual

    return (
        <section id="nav-menu" className="d-flex">
            <nav className="navbar navbar-expand-lg navbar-light d-flex flex-column">
                <a className="navbar-brand" href="#">
                    <img src="./src/assets/go_rent_a_car.svg" alt="Logo" />
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="w-100" id="navbarNav">
                    <ul className="navbar-nav flex-column w-100">
                        <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
                            <Link className="nav-link d-flex" to="/">
                                <i className="bi bi-house mr-3"></i>Home
                            </Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/reservar' ? 'active' : ''}`}>
                            <Link className="nav-link d-flex" to="/reservar">
                                <i className="bi bi-person-add mr-3"></i>Reservar
                            </Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/carros' ? 'active' : ''}`}>
                            <Link className="nav-link d-flex" to="/carros">
                                <i className="bi bi-car-front mr-3"></i>Carros
                            </Link>
                        </li>
                        <li className={`nav-item ${location.pathname === '/clientes' ? 'active' : ''}`}>
                            <Link className="nav-link d-flex" to="/clientes">
                                <i className="bi bi-people mr-3"></i>Clientes
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </section>
    );
};

export default Navbar;
