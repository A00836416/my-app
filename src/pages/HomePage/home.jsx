import React, { useState, useEffect, useContext } from 'react';
import { logout, checkAuthStatus } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';

const HomePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { setAuthState } = useContext(AuthContext);

    useEffect(() => {
        const fetchAuthStatus = async () => {
            try {
                const userData = await checkAuthStatus();
                setUser(userData);
            } catch (error) {
                setAuthState(prevState => ({ ...prevState, isAuthenticated: false }));
                navigate('/login');
            }
        };
        fetchAuthStatus();
    }, [navigate, setAuthState]);

    const handleLogout = async () => {
        try {
            await logout();
            setAuthState(prevState => ({
                ...prevState,
                isAuthenticated: false,
                userRole: null
            }));
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

export default HomePage;