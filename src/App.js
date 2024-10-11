import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { checkAuthStatus } from './services/api';
import './App.css';
import LoginPage from './pages/LoginPage/login';
import AdminPage from './pages/admin';
import Welcome from './components/Welcome/Welcome';
import Leaderboard from './pages/LeaderboardPage/Leaderboard';
import ProtectedLayout from './components/ProtectedLayout/index';
import HomePage from './pages/HomePage/home';
import ProfilePage from './pages/ProfilePage/profile';
import SettingsPage from './pages/SettingsPage/Settings';
import NotificationsPage from './pages/NotificationsPage/notifications';
import UnityGame from './components/Unity';


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
          user: authData.user,
          loading: false
        });
      } catch (error) {
        console.error("Error verifying auth:", error);
        setAuthState({ isAuthenticated: false, userRole: null, userId: null, user: null, loading: false });
      }
    };
    verifyAuth();
  }, []);

  if (authState.loading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={{ ...authState, setAuthState }}>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/welcome" element={<Welcome />} />

            <Route
              path="/login"
              element={
                authState.isAuthenticated
                  ? <Navigate to={authState.userRole === 'administrador' ? "/admin" : "/home"} replace />
                  : <LoginPage />
              }
            />
            <Route
              path="/admin/*"
              element={
                authState.isAuthenticated && authState.userRole === 'administrador'
                  ? <AdminPage />
                  : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/"
              element={
                authState.isAuthenticated && authState.userRole !== 'administrador'
                  ? <ProtectedLayout />
                  : <Navigate to="/Welcome" replace />
              }
            >
              <Route index element={<Navigate to="/home" replace />} />
              <Route path="home" element={<HomePage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="notifications" element={<NotificationsPage />} />
              <Route path="/unity-game" element={<UnityGame />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;