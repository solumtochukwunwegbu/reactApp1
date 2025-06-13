// layout.jsx (no Router here)
import React from 'react';
import { Link } from 'react-router-dom';
import "./assets/layout.css";



export default function Footer() {
  return (
    <footer className="dashboard">
        <div className="dash-item">
          <span className="icon">🏠</span>
          <span className="label">Dashboard</span>
        </div>
        <div className="dash-item">
          <span className="icon">🛠️</span>
          <span className="label">Service</span>
        </div>
        <div className="dash-item">
          <span className="icon">📊</span>
          <span className="label">Reports</span>
        </div>
        <div className="dash-item">
          <span className="icon">⚙️</span>
          <span className="label">Settings</span>
        </div>
      </footer>
  );
}
