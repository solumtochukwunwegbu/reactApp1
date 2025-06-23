import React, { useState, useEffect } from 'react';
import './settings.css';
import axios from 'axios';

export default function Settings() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    if (!user || !user.email) return;

    axios
      .post('http://localhost:3001/api/user', { email: user.email })
      .then(res => {
        if (res.data) setFormData(res.data);
      })
      .catch(err => console.error('Error loading user settings:', err));
  }, [user]);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .post('http://localhost:3001/api/user/update', {
        name: formData.name,
        email: user.email // secure identity
      })
      .then(() => alert('Settings updated successfully!'))
      .catch(() => alert('Failed to update settings.'));
  };

  if (!user) return <p>Not authorized. Please log in.</p>;

  return (
    <div className="settings-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit} className="settings-form">
        <label>
          Name:
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            name="email"
            value={formData.email}
            disabled
            readOnly
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
