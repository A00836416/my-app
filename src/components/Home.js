// src/components/Home.js
import React from 'react';
import { getCurrentUser, logout } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const currentUser = getCurrentUser();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div>
            <h1>Bienvenido, {currentUser?.userName}!</h1>
            <p>Esta es la página de inicio.</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};

export default Home;