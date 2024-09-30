import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavigationMenu from '../NavMenu/index';
import './index.css';

const ProtectedLayout = () => {
    const location = useLocation();

    return (
        <div className="employee-layout">
            <main className="main-content">
                <Outlet />
            </main>
            <NavigationMenu currentPath={location.pathname} />
        </div>
    );
};

export default ProtectedLayout;