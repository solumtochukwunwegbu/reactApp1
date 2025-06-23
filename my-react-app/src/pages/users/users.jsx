import React, { useState } from 'react';
import './users.css'; // Import the CSS file

export default function Users() {
  const [activeTab, setActiveTab] = useState('form');
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers((prev) => [...prev, formData]);
    setFormData({ name: '', email: '' });
    setActiveTab('list');
  };

  return (
    <div className="container">
      <div className="tabs">
        <button
          className={activeTab === 'form' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('form')}
        >
          Form
        </button>
        <button
          className={activeTab === 'list' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('list')}
        >
          User List
        </button>
      </div>

      {activeTab === 'form' && (
        <form onSubmit={handleSubmit} className="form">
          <label>
            Name:
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}

      {activeTab === 'list' && (
        <ul className="user-list">
          {users.length === 0 ? (
            <li>No users yet.</li>
          ) : (
            users.map((user, index) => (
              <li key={index}>
                <strong>{user.name}</strong> – {user.email}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};


