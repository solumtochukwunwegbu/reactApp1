import React, { useState, useEffect } from 'react';
import './settings.css';
import axios from 'axios';

export default function Settings() {
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    phone: '',
    email: '',
    base_location_state: '',
    base_location_area: '',
    password: ''
  });

  const [showModal, setShowModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const user = JSON.parse(sessionStorage.getItem('user'));

  useEffect(() => {
    if (!user || !user.email) return;

    let isMounted = true;

    axios
      .post('http://localhost:3001/api/user', { email: user.email })
      .then(res => {
        if (isMounted && res.data) {
          const data = res.data || {};
          setFormData({
            id: data.id || '',
            username: data.username || '',
            first_name: data.first_name || '',
            middle_name: data.middle_name || '',
            last_name: data.last_name || '',
            phone: data.phone || '',
            email: data.email || '',
            base_location_state: data.base_location_state || '',
            base_location_area: data.base_location_area || '',
            password: ''
          });
        }
      });

    return () => { isMounted = false };
  }, []);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const payload = { ...formData };
    if (!payload.password) delete payload.password;

    axios
      .post('http://localhost:3001/api/user/update', payload)
      .then(() => {
        alert('Profile updated!');
        setShowModal(false);
      })
      .catch(() => alert('Failed to update profile.'));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    window.location.reload();
  };

  if (!user) return <p>Not authorized. Please log in.</p>;

  return (
    <div className="settings-container">
      <div className="profile">
        <h2>Your Profile</h2>
        <div><strong>Username:</strong> {formData.username}</div>
        <div><strong>Name:</strong> {formData.first_name} {formData.middle_name} {formData.last_name}</div>
        <div><strong>Phone:</strong> {formData.phone}</div>
        <div><strong>Email:</strong> {formData.email}</div>
        <div><strong>State:</strong> {formData.base_location_state}</div>
        <div><strong>Area:</strong> {formData.base_location_area}</div>
      </div>

      <button onClick={() => setShowModal(true)}>Edit Profile</button>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-container">
            <h3>Edit Your Profile</h3>
            <form onSubmit={handleSubmit} className="modal-form">
              <label>
                Username:
                <input name="username" value={formData.username} onChange={handleChange} required />
              </label>
              <label>
                First Name:
                <input name="first_name" value={formData.first_name} onChange={handleChange} required />
              </label>
              <label>
                Middle Name:
                <input name="middle_name" value={formData.middle_name} onChange={handleChange} />
              </label>
              <label>
                Last Name:
                <input name="last_name" value={formData.last_name} onChange={handleChange} required />
              </label>
              <label>
                Phone:
                <input name="phone" value={formData.phone} onChange={handleChange} />
              </label>
              <label>
                Email:
                <input name="email" value={formData.email} readOnly disabled />
              </label>
              <label>
                State:
                <input name="base_location_state" value={formData.base_location_state} onChange={handleChange} />
              </label>
              <label>
                Area:
                <input name="base_location_area" value={formData.base_location_area} onChange={handleChange} />
              </label>
              <label>
                New Password:
                <input
                  name="password"
                  type="password"
                  placeholder="Leave blank to keep existing"
                  value={formData.password}
                  onChange={handleChange}
                />
              </label>

              <div className="modal-actions">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🔴 Logout Button */}
      <div style={{ marginTop: '30px' }}>
        <button
          onClick={() => setShowLogoutConfirm(true)}
          className="logout-btn"
        >
          Logout
        </button>
      </div>

      {/* 🔒 Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="modal-backdrop">
          <div className="modal-container" style={{ maxWidth: '400px', textAlign: 'center' }}>
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to log out?</p>
            <div className="modal-actions" style={{ justifyContent: 'center' }}>
              <button onClick={handleLogout} className="confirm-logout">Yes, Logout</button>
              <button onClick={() => setShowLogoutConfirm(false)} className="cancel-logout">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
