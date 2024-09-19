import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { checkAuthStatus } from './services/api';
import './App.css';
import HomePage from './pages/HomePage/home';
import LoginPage from './pages/LoginPage/login';
import AdminPage from './pages/admin';

export const AuthContext = createContext(null);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const userData = await checkAuthStatus();
        setIsAuthenticated(true);
        setUserRole(userData.rol);
      } catch (error) {
        setIsAuthenticated(false);
        setUserRole(null);
      } finally {
        setLoading(false);
      }
    };
    verifyAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userRole, setUserRole }}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={isAuthenticated ? (userRole === 'administrador' ? <Navigate to="/admin" /> : <Navigate to="/home" />) : <LoginPage />} />
            <Route path="/home" element={isAuthenticated && userRole !== 'administrador' ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/admin" element={isAuthenticated && userRole === 'administrador' ? <AdminPage /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;