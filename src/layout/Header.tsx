import React, {useState, useEffect} from 'react';
import {Link, useLocation} from 'react-router-dom';

export const Header = () => {
    const location = useLocation();
    const [title, setTitle] = useState('Environmental monitoring of Kyiv');

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                setTitle('About - Environmental monitoring of Kyiv');
                break;
            case '/pollution':
                setTitle('Data Management - Environmental monitoring of Kyiv');
                break;
            default:
                setTitle('Environmental monitoring of Kyiv');
                break;
        }
    }, [location.pathname]);

    return (
        <header className="header">
            <h1>{title}</h1>
            <nav>
                <Link to="/" className="nav-link">About</Link>
                <Link to="/pollution" className="nav-link">Data Management</Link>
            </nav>
        </header>
    );
};