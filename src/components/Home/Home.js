import React, { useState, useEffect, useContext } from 'react';
import { logout, checkAuthStatus } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

const Home = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                const userData = await checkAuthStatus();
                setUser(userData);
            } catch (error) {
                setIsAuthenticated(false);
                navigate('/login');
            }
        };
        fetchAuthStatus();
    }, [navigate, setIsAuthenticated]);

    const handleLogout = async () => {
        try {
            await logout();
            setIsAuthenticated(false);
            navigate('/login');
        } catch (error) {
            console.error('Error during logout:', error);
            // Manejar el error de logout aquí si es necesario
        }
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