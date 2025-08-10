// Users.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './users.css';

export default function Users() {
  const [activeTab, setActiveTab] = useState('list');
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: '', first_name: '', middle_name: '',
    last_name: '', phone: '', email: '',
    base_location_state: '', base_location_area: '', password: ''
  });

  useEffect(() => { fetchUsers(); }, []);
  const fetchUsers = () => {
    axios.get('http://localhost:3001/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Fetch error', err));
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleStatusChange = (userId, newStatus) => {
    axios.post('http://localhost:3001/api/user/status', { id: userId, status: newStatus })
      .then(() => fetchUsers())
      .catch(err => console.error('Status update error', err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/users', formData)
      .then(() => {
        setFormData({
          username: '', first_name: '', middle_name: '',
          last_name: '', phone: '', email: '',
          base_location_state: '', base_location_area: '', password: ''
        });
        fetchUsers();
        setActiveTab('list');
      })
      .catch(err => console.error('Add user error', err));
  };

  return (
    <div className="container">
      <div className="tabs">
        <button className={activeTab === 'form' ? 'tab active' : 'tab'} onClick={() => setActiveTab('form')}>Add User</button>
        <button className={activeTab === 'list' ? 'tab active' : 'tab'} onClick={() => setActiveTab('list')}>User List</button>
      </div>

      {activeTab === 'form' && (
        <form onSubmit={handleSubmit} className="form">
          {['username', 'first_name', 'middle_name', 'last_name', 'phone', 'email', 'base_location_state', 'base_location_area', 'password'].map(field => (
            <label key={field}>
              {field.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}:
              <input
                name={field}
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                value={formData[field]}
                onChange={handleInputChange}
                required={['username', 'first_name', 'last_name', 'email', 'password'].includes(field)}
              />
            </label>
          ))}
          <button type="submit">Create User</button>
        </form>
      )}

      {activeTab === 'list' && (
        <ul className="user-list">
          {users.length === 0 ? (
            <li>No users found.</li>
          ) : (
            users.map(user => (
              <li key={user.id} className="user-item">
                <div className="user-info">
                  <strong>{user.first_name} {user.middle_name} {user.last_name}</strong> @{user.username}
                </div>
                <div className="status-toggle">
                  <select
                    value={user.status}
                    onChange={(e) => handleStatusChange(user.id, e.target.value)}
                  >
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
