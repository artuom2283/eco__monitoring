import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';

export const Header = () => {
    const location = useLocation();
    const [title, setTitle] = useState('Environmental monitoring of Dnipropetrovsk region');

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setTitle('About - Environmental monitoring of Dnipropetrovsk region');
                break;
            case '/pollution':
                setTitle('Data Management - Environmental monitoring of Dnipropetrovsk region');
                break;
            case '/calculation':
                setTitle('Calculation - Environmental monitoring of Dnipropetrovsk region');
                break;
            default:
                setTitle('Environmental monitoring of Dnipropetrovsk region');
                break;
        }
    }, [location.pathname]);

    return (
        <header className="header">
            <h1 className="header-title">{title}</h1>
            <nav>
                <Link to="/" className="nav-link">About</Link>
                <Link to="/pollution" className="nav-link">Data Management</Link>
                <Link to="/calculation" className="nav-link">Calculation</Link>
            </nav>
        </header>
    );
};