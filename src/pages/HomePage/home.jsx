import React, { useState, useEffect, useContext } from 'react';
import { checkAuthStatus } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import HomeHeader from '../../components/Home/HomeHeader/HomeHeader';
import HomeTabBar from '../../components/Home/HomeTabBar/HomeTabBar';
import HomeTareaDiaria from '../../components/Home/HomeTareaDiaria/HomeTareaDiaria';
import HomeTareaSemanal from '../../components/Home/HomeTareaSemanal/HomeTareaSemanal';
import styles from './HomePage.module.css';
import '@fortawesome/fontawesome-free/css/all.css';

const HomePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const { setIsAuthenticated } = useContext(AuthContext);
    

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



    const goToLogoutPage = async () => {
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

    const goToNotifications = () => {
        // Aquí podrías definir qué hacer al hacer clic en el botón de notificaciones
        console.log('Notificaciones');
    };
    
    if (!user) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.container}>
            <HomeHeader></HomeHeader>
            <HomeTabBar></HomeTabBar>
            <HomeTareaDiaria></HomeTareaDiaria>
            <HomeTareaSemanal></HomeTareaSemanal>
        </div>
    );
};

export default HomePage;