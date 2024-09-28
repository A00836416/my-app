import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../App';
import './index.css';

const NavigationMenu = ({ currentPath }) => {
    const { isAuthenticated, userRole } = useContext(AuthContext);

    const menuItems = [
        { path: '/home', label: 'Inicio', icon: <i className="fas fa-home"></i> },
        { path: '/leaderboard', label: 'Tabla', icon: <i className="fas fa-table"></i> },
        { path: '/unity-game', label: 'Oficina', icon: <i className="fas fa-building"></i> },

    ];

    if (!isAuthenticated || userRole === 'administrador') {
        return null;
    }

    return (
        <nav className="navigation-menu">
            <div className="navigation-container">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`menu-item ${currentPath === item.path ? 'active' : ''}`}
                    >
                        <span className="icon">{item.icon}</span>
                        <span className="label">{item.label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default NavigationMenu;

