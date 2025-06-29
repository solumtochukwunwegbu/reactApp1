import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './users.css';

export default function Users() {
  const [activeTab, setActiveTab] = useState('list');
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    phone: '',
    email: '',
    base_location_state: '',
    base_location_area: '',
    password: ''
  });

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
        setFormData({
          username: '',
          first_name: '',
          middle_name: '',
          last_name: '',
          phone: '',
          email: '',
          base_location_state: '',
          base_location_area: '',
          password: ''
        });
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
          Add User
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
          <label>Username:
            <input name="username" value={formData.username} onChange={handleInputChange} required />
          </label>
          <label>First Name:
            <input name="first_name" value={formData.first_name} onChange={handleInputChange} required />
          </label>
          <label>Middle Name:
            <input name="middle_name" value={formData.middle_name} onChange={handleInputChange} />
          </label>
          <label>Last Name:
            <input name="last_name" value={formData.last_name} onChange={handleInputChange} required />
          </label>
          <label>Phone:
            <input name="phone" value={formData.phone} onChange={handleInputChange} />
          </label>
          <label>Email:
            <input name="email" type="email" value={formData.email} onChange={handleInputChange} required />
          </label>
          <label>Base Location State:
            <input name="base_location_state" value={formData.base_location_state} onChange={handleInputChange} />
          </label>
          <label>Base Location Area:
            <input name="base_location_area" value={formData.base_location_area} onChange={handleInputChange} />
          </label>
          <label>Password:
            <input name="password" type="password" value={formData.password} onChange={handleInputChange} required />
          </label>
          <button type="submit">Create User</button>
        </form>
      )}

      {activeTab === 'list' && (
        <ul className="user-list">
          {users.length === 0 ? (
            <li>No users yet.</li>
          ) : (
            users.map((user, index) => (
              <li key={index}>
                <strong>{user.first_name} {user.middle_name} {user.last_name}</strong> @{user.username}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
