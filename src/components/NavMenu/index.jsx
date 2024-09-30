import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../App';
import './index.css';

const NavigationMenu = ({ currentPath }) => {
    const { isAuthenticated, userRole } = useContext(AuthContext);

    const menuItems = [
        { path: '/home', label: 'Inicio', icon: '🏠' },
        { path: '/profile', label: 'Perfil', icon: '👤' },
        { path: '/unity-game', label: 'Oficina', icon: '🏢' },

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

