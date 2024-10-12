import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuthStatus } from '../../services/api';
import { AuthContext } from '../../App';
import HomeHeader from '../../components/Home/HomeHeader/HomeHeader';
import HomeTareaDiaria from '../../components/Home/HomeTareaDiaria/HomeTareaDiaria';
import styles from './HomePage.module.css';
import '@fortawesome/fontawesome-free/css/all.css';

const HomePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    const fetchUserData = useCallback(async () => {
        try {
            const userData = await checkAuthStatus();
            setUser(userData);
        } catch (error) {
            console.error('Error fetching user data:', error);
            setIsAuthenticated(false);
            navigate('/login');
        } finally {
            setLoading(false);
        }
    }, [navigate, setIsAuthenticated]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    if (loading) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.container}>
            <HomeHeader user={user} />
            <HomeTareaDiaria />
        </div>
    );
};

export default HomePage;