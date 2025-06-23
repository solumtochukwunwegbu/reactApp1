import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import IndexPage from './pages/index/index';
import Reports from './pages/reports/reports'; 
import Service from './pages/service/service';
import Users from './pages/users/users';
import Settings from './pages/settings/settings';
import { Dashboard, Logo } from './layout';

import LoginModal from './assets/login';

export default function App() {
  const [user, setUser] = useState(null);
  const [loginShown, setLoginShown] = useState(false);

  // Check sessionStorage for user on app load
  useEffect(() => {
    const stored = sessionStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      setLoginShown(true);
    }
  }, []);

  // Callback from LoginModal after successful login
  const handleLoginSuccess = (userData) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setLoginShown(false);
  };

  // If user is not logged in, show modal only
  if (!user) {
    return <LoginModal show={loginShown} onLoginSuccess={handleLoginSuccess} />;
  }

  // If logged in, show full app
  return (
    <div>
      <Logo />
      <main style={{ paddingBottom: '300px' }}>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/service" element={<Service />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      <Dashboard />
    </div>
  );
}
