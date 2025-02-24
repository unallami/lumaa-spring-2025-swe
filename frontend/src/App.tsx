import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TasksPage from './pages/TasksPage';
import { AuthProvider, AuthContext } from './context/AuthContext';

const AppRoutes = () => {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      {!token ? (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <>
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="*" element={<Navigate to="/tasks" />} />
        </>
      )}
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppRoutes />
    </Router>
  </AuthProvider>
);

export default App;
