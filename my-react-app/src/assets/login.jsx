import React, { useState } from 'react';
import './login.css';

export default function LoginModal({ show, onLoginSuccess }) {
  const [form, setForm] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});

  if (!show) return null;

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email })
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const user = await response.json();

      if (user && user.name === form.name) {
        sessionStorage.setItem('user', JSON.stringify(user));
        onLoginSuccess(user); // Tell App login was successful
      } else {
        setErrors({ email: 'No matching user found. Please register.' });
      }
    } catch (err) {
      console.error('Login error:', err);
      setErrors({ email: 'Login failed. Please try again.' });
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h2 className="modal-title">Welcome Back! 🤗</h2>
        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          <div className="form-group">
            {errors.name && <span className="error-text">{errors.name}</span>}
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`modal-input ${errors.name ? 'input-error' : ''}`}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            {errors.email && <span className="error-text">{errors.email}</span>}
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className={`modal-input ${errors.email ? 'input-error' : ''}`}
              placeholder="Enter your email"
            />
          </div>

          <button type="submit" className="modal-button">Login</button>
        </form>
      </div>
    </div>
  );
}
