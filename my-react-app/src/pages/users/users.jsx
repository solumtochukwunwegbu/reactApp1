import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './users.css'; // Import the CSS file

export default function Users() {
  const [activeTab, setActiveTab] = useState('list');
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });

  // Fetch users from backend
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/users')
      .then((res) => setUsers(res.data))
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/api/users', formData)
      .then((res) => {
        setUsers((prev) => [...prev, res.data]);
        setFormData({ name: '', email: '' });
        setActiveTab('list');
      })
      .catch((err) => console.error('Error adding user:', err));
  };

  return (
    <div className="container">
      <div className="tabs">
        <button
          className={activeTab === 'form' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('form')}
        >
          Signup
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
                <strong>{user.name}</strong>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
