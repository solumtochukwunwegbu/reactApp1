// layout.jsx (no Router here)
import React from 'react';
import { Link } from 'react-router-dom';
import "./assets/layout.css";

export function Header() {
  return (
    <header className='header'>
      <h1>My Website</h1>
      <nav>
        <ul style={{ display: 'flex', gap: '10px', listStyle: 'none', padding: 0 }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/calculator">Calculator</Link></li>
        </ul>
      </nav>
      
    </header>
  );
}

export function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Your Website thing</p>
    </footer>
  );
}
