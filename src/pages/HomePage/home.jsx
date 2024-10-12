import React, { useState, useEffect, useContext } from 'react';
import { checkAuthStatus } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import HomeHeader from '../../components/Home/HomeHeader/HomeHeader';
import HomeTabBar from '../../components/Home/HomeTabBar/HomeTabBar';
import HomeTareaDiaria from '../../components/Home/HomeTareaDiaria/HomeTareaDiaria';
import HomeProgress from '../../components/Home/HomeProgress/HomeProgress';
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
                setIsAuthenticated(false);
                navigate('/login');
            }
        };
        fetchAuthStatus();
    }, [navigate, setIsAuthenticated]);

    if (!user) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.container}>
            <HomeHeader></HomeHeader>
            <HomeTareaDiaria></HomeTareaDiaria>
            <HomeProgress></HomeProgress>
        </div>
    );
};

export default HomePage;