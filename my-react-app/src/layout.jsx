import { useState } from "react";
import { Link } from "react-router-dom";
import "./assets/layout.css";
// Component (only from here!)
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Icons — import from proper icon packs
import { faHouse, faWrench, faGear, faUser } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-regular-svg-icons'; // chartBar is regular

import logo from './assets/full_logo.256047a7.png';



export function Dashboard() {
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
                  <span className="icon text-black"> <FontAwesomeIcon icon={faHouse} /></span>
                  <span className="label">Dashboard</span>
                </Link>
              </div>
      <div className="dash-item">
        <Link to="/service">
          <span className="icon text-black">
            <FontAwesomeIcon icon={faWrench} />
          </span>
          <span className="label">Service</span>
        </Link>
      </div>

      <div className="dash-item">
        <Link to="/reports">
          <span className="icon text-black">
            <FontAwesomeIcon icon={faChartBar} />
          </span>
          <span className="label">Reports</span>
        </Link>
      </div>

      <div className="dash-item">
        <Link to="/users">
          <span className="icon text-black">
            <FontAwesomeIcon icon={faUser} />
          </span>
          <span className="label">Users</span>
        </Link>
      </div>
      
      <div className="dash-item">
        <Link to="/settings">
          <span className="icon text-black">
            <FontAwesomeIcon icon={faGear} />
          </span>
          <span className="label">Settings</span>
        </Link>
      </div>

      
          </div>
      <div className="copyright">&copy; {year} Etop.ng</div>
    </footer>
  );
}

export function Logo(){
      return(
        <div className="logo-container">
          <img className="logo" src= {logo}/>
        </div>
      );
}