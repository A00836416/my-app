import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { checkAuthStatus } from './services/api';
import './App.css';
import HomePage from './pages/HomePage/home';
import LoginPage from './pages/LoginPage/login';
import AdminPage from './pages/admin';
import ProfilePage from './pages/ProfilePage/profile';
import Welcome from './components/Welcome/Welcome';

export const AuthContext = createContext(null);

function App() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: null,
    userId: null,
    user: null,
    loading: true
  });

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const authData = await checkAuthStatus();
        setAuthState({
          isAuthenticated: authData.isAuthenticated,
          userRole: authData.user.rol,
          userId: authData.user.id,
          user: null,
          loading: false
        });
      } catch (error) {
        console.error("Error verifying auth:", error);
        setAuthState({ isAuthenticated: false, userRole: null, userId: null, user: null, loading: false });
      }
    };
    verifyAuth();
  }, []);

  const isAdmin = authState.userRole === 'administrador';

  const ProtectedRoute = ({ children, adminOnly = false }) => {
    if (authState.loading) {
      return <div>Cargando...</div>;
    }
    if (!authState.isAuthenticated) return <Navigate to="/login" />;
    if (adminOnly && !isAdmin) return <Navigate to="/home" />;
    return children;
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAuthState }}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/login" element={authState.isAuthenticated ? <Navigate to={isAdmin ? "/admin" : "/home"} /> : <LoginPage />} />
            <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to={authState.isAuthenticated ? (isAdmin ? "/admin" : "/home") : "/login"} />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;