// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { logout, checkAuthStatus } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                const userData = await checkAuthStatus();
                setUser(userData);
            } catch (error) {
                navigate('/login');
            }
        };
        fetchAuthStatus();
    }, [navigate]);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h1>Bienvenido, {user.userName}!</h1>
            <p>Esta es la página de inicio.</p>
            <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    );
};

export default Home;