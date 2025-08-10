// Merchants.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './merchants.css';

export default function Merchants() {
  const [activeTab, setActiveTab] = useState('list');
  const [merchants, setMerchants] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    TerminalID: '',
    MerchantName: '',
    Address: '',
    TerminalKey: '',
    phone: '',
    appName: '',
    appVersion: '',
    ptsp: '',
    serial: '',
    type: '',
    model: '',
    connectivity: '',
    network: '',
    latitude: '',
    longitude: '',
    comment: '',
    commentOther: ''
  });

  useEffect(() => { fetchMerchants(); }, []);

  const fetchMerchants = () => {
    axios.get('http://localhost:3001/api/merchants')
      .then(res => setMerchants(res.data))
      .catch(err => console.error('Fetch error', err));
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEditClick = (merchant) => {
    setFormData(merchant);
    setActiveTab('form');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/merchant/update', formData)
      .then(() => {
        fetchMerchants();
        setActiveTab('list');
      })
      .catch(err => console.error('Update merchant error', err));
  };

  return (
    <div className="container">
      <div className="tabs">
        <button
          className={activeTab === 'form' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('form')}
        >
          Edit Merchant
        </button>
        <button
          className={activeTab === 'list' ? 'tab active' : 'tab'}
          onClick={() => setActiveTab('list')}
        >
          Merchant List
        </button>
      </div>

      {activeTab === 'form' && (
        <form onSubmit={handleSubmit} className="form">
          {Object.keys(formData).filter(key => key !== 'id').map(field => (
            <label key={field}>
              {field.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}:
              <input
                name={field}
                type="text"
                value={formData[field] || ''}
                onChange={handleInputChange}
              />
            </label>
          ))}
          <button type="submit">Save Changes</button>
        </form>
      )}

      {activeTab === 'list' && (
        <ul className="merchant-list">
          {merchants.length === 0 ? (
            <li>No merchants found.</li>
          ) : (
            merchants.map(m => (
              <li key={m.id} className="merchant-item">
                <div>
                  <strong>{m.MerchantName}</strong> – {m.TerminalID}
                </div>
                <button onClick={() => handleEditClick(m)}>Edit</button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
