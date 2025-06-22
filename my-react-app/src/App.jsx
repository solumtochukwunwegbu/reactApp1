// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/index/index';
import Reports from './pages/reports/reports'; 
import Service from './pages/service/service';
import Settings from './pages/settings/settings';
import {Dashboard, Logo} from './layout';


export default function App() {
  // alert("Hello");
  return (
    <div>
       <Logo/>
       {/* Wrap content in a main with padding */}
        <main style={{ paddingBottom: '300px' }}>
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/service" element={<Service />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>

      <Dashboard />
    </div>
  );
}
