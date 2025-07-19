import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoginPage from './components/LoginPage';
import MemberDashboard from './components/MemberDashboard';
import ViewerDashboard from './components/ViewerDashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Load submissions from localStorage
    const storedSubmissions = localStorage.getItem('submissions');
    if (storedSubmissions) {
      setSubmissions(JSON.parse(storedSubmissions));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addSubmission = (submission) => {
    const newSubmission = {
      ...submission,
      id: Date.now(),
      submittedAt: new Date().toISOString(),
      submittedBy: user.username
    };
    const updatedSubmissions = [newSubmission, ...submissions];
    setSubmissions(updatedSubmissions);
    localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Routes>
          <Route 
            path="/login" 
            element={
              user ? (
                <Navigate to={user.role === 'member' ? '/member' : '/viewer'} replace />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            } 
          />
          <Route 
            path="/member" 
            element={
              user && user.role === 'member' ? (
                <MemberDashboard 
                  user={user} 
                  onLogout={handleLogout}
                  onSubmit={addSubmission}
                  submissions={submissions}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/viewer" 
            element={
              user && user.role === 'viewer' ? (
                <ViewerDashboard 
                  user={user} 
                  onLogout={handleLogout}
                  submissions={submissions}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
          <Route 
            path="/" 
            element={
              user ? (
                <Navigate to={user.role === 'member' ? '/member' : '/viewer'} replace />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;