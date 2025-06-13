import { useState } from "react";
import { Link } from "react-router-dom";
import "./assets/layout.css";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <footer className={`dashboard ${isOpen ? "open" : "closed"}`}>
      <button
        className="toggle-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Footer"
      >
        {isOpen ? "↓ Hide Menu" : "↑ Show Menu"}
      </button>

      <div className="dash-container">
        <div className="dash-item">
          <Link to="/">
            <span className="icon">🏠</span>
            <span className="label">Dashboard</span>
          </Link>
        </div>
        <div className="dash-item">
          <Link to="/service">
            <span className="icon">🛠️</span>
            <span className="label">Service</span>
          </Link>
        </div>
        <div className="dash-item">
          <Link to="/reports">
            <span className="icon">📊</span>
            <span className="label">Reports</span>
          </Link>
        </div>
        <div className="dash-item">
          <Link to="/settings">
            <span className="icon">⚙️</span>
            <span className="label">Settings</span>
          </Link>
        </div>
      </div>

      <div className="copyright">&copy; {year} Etop.ng</div>
    </footer>
  );
}
