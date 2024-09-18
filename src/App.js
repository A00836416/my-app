// src/App.js
import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { checkAuthStatus } from './services/api';
import './App.css';
import HomePage from './pages/HomePage/home';
import LoginPage from './pages/login';

export const AuthContext = createContext(null);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await checkAuthStatus();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
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
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={isAuthenticated ? <Navigate to="/home" /> : <LoginPage />} />
            <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;