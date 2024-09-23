import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { checkAuthStatus } from './services/api';
import './App.css';
import HomePage from './pages/HomePage/home';
import LoginPage from './pages/LoginPage/login';
import AdminPage from './pages/admin';
import ProfilePage from './pages/ProfilePage/profile';

export const AuthContext = createContext(null);

function App() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    userRole: null,
    loading: true
  });

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const authData = await checkAuthStatus();
        setAuthState({
          isAuthenticated: authData.isAuthenticated,
          userRole: authData.user.rol,
          loading: false
        });
      } catch (error) {
        setAuthState({ isAuthenticated: false, userRole: null, loading: false });
      }
    };
    verifyAuth();
  }, []);

  if (authState.loading) {
    return <div>Loading...</div>;
  }

  const isAdmin = authState.userRole === 'administrador';

  const ProtectedRoute = ({ children, adminOnly = false }) => {
    if (!authState.isAuthenticated) return <Navigate to="/login" />;
    if (adminOnly && !isAdmin) return <Navigate to="/home" />;
    if (!adminOnly && isAdmin) return <Navigate to="/admin" />;
    return children;
  };

  const routes = {
    '/login': <LoginPage />,
    '/home': <ProtectedRoute><HomePage /></ProtectedRoute>,
    '/admin': <ProtectedRoute adminOnly={true}><AdminPage /></ProtectedRoute>,
    '/profile': <ProtectedRoute adminOnly={false}><ProfilePage /></ProtectedRoute>,
    '/': <Navigate to={authState.isAuthenticated ? (isAdmin ? "/admin" : "/home") : "/login"} />
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAuthState }}>
      <Router>
        <div className="App">
          <Routes>
            {Object.entries(routes).map(([path, element]) => (
              <Route key={path} path={path} element={
                path === '/login' && authState.isAuthenticated ?
                  <Navigate to={isAdmin ? "/admin" : "/home"} /> :
                  element
              } />
            ))}
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;