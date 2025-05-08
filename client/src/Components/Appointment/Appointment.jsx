import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';

export default function Appointment() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    city: '',
    location: '',
    hospital: '',
    date: '',
    time: '',
    consultationType: '',
    problem: '',
    level: '',
    providerName: '' // ✅ Include provider name
  });

  useEffect(() => {
    if (location.state) {
      setFormData(prev => ({
        ...prev,
        city: location.state.city || '',
        location: location.state.location || '',
        hospital: location.state.hospital || '',
        providerName: location.state.providerName || ''
      }));
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Appointment booked successfully!');
        console.log('Server Response:', result);
        navigate('/dashboard');
      } else {
        console.error('Server responded with error:', result);
        alert('Failed to book appointment: ' + (result?.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Fetch failed:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container">
      <main className="main-content">
        <div className="topbar">
          <input className="search-bar" type="text" placeholder="Search Appointments, patients, etc" />
          <div className="user-icon">👤</div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          {/* ✅ Back Button */}
          <button
            type="button"
            onClick={() => navigate('/staff')}
            style={{ backgroundColor: '#1e293b', color: 'white', padding: '8px 16px', borderRadius: '8px', marginBottom: '20px', border: 'none', cursor: 'pointer' }}
          >
            ← Back to Staff
          </button>

          <h2 className="form-title">
            Book an Appointment
            {formData.providerName && <span style={{ display: 'block', fontSize: '18px', marginTop: '5px' }}>with {formData.providerName}</span>}
          </h2>

          <label>City Name</label>
          <input name="city" value={formData.city} placeholder="City" onChange={handleChange} />

          <label>Location</label>
          <input name="location" value={formData.location} placeholder="Upload location" onChange={handleChange} />

          <label>Hospital</label>
          <input name="hospital" value={formData.hospital} placeholder="Select Hospital" onChange={handleChange} />

          <label>Date</label>
          <input name="date" type="date" onChange={handleChange} />

          <label>Time</label>
          <input name="time" type="time" onChange={handleChange} />

          <label>Consultation Type</label>
          <input name="consultationType" placeholder="Select Consultation type" onChange={handleChange} />

          <label>Problem</label>
          <textarea name="problem" placeholder="Describe the problem" onChange={handleChange} />

          <label>Level</label>
          <div className="priority-buttons">
            {["Urgent", "High", "Medium", "Normal"].map((level) => (
              <button
                key={level}
                type="button"
                className={`priority-btn ${formData.level === level ? 'active' : ''} ${level.toLowerCase()}`}
                onClick={() => setFormData({ ...formData, level })}
              >
                {level}
              </button>
            ))}
          </div>

          <button type="submit" className="submit-btn">Book</button>
        </form>
      </main>
    </div>
  );
}
