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
    providerName: '',  // displayed on UI
    doctorName: '',    // sent to DB
    patientName: ''    // will be filled from token if needed
  });

  const [providerAvailability, setProviderAvailability] = useState([]);
  const defaultTimeSlots = ["09:00", "11:00", "14:00"];

  useEffect(() => {
    if (location.state) {
      const {
        city,
        location: loc,
        hospital,
        providerName,
        availableDays = [],
        availableTimes = defaultTimeSlots
      } = location.state;

      setFormData(prev => ({
        ...prev,
        city: city || '',
        location: loc || '',
        hospital: hospital || '',
        providerName: providerName || '',
        doctorName: providerName || ''
      }));

      const availability = [];
      availableDays.forEach(day => {
        availableTimes.forEach(time => {
          availability.push({ day, time });
        });
      });
      setProviderAvailability(availability);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAvailabilityClick = (day, time) => {
    setFormData(prev => ({
      ...prev,
      date: day,
      time: time
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      patientName: formData.patientName || 'Anonymous', // You can replace this with real user logic
      doctorName: formData.doctorName,
      date: new Date().toISOString().split('T')[0], // fallback if user didn't pick
      time: formData.time,
      city: formData.city,
      location: formData.location,
      hospital: formData.hospital,
      consultationType: formData.consultationType,
      problem: formData.problem,
      level: formData.level
    };

    try {
      const response = await fetch('http://localhost:5000/api/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Appointment booked successfully!');
        console.log('✅ Server Response:', result);
        navigate('/dashboard');
      } else {
        console.error('❌ Server responded with error:', result);
        alert('Failed to book appointment: ' + (result?.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('❌ Fetch failed:', error);
      alert('Appointment booking Succesfully.');
    }
  };

  return (
    <div className="container">
      <main className="main-content">
        <div className="topbar">
          <div className="user-icon">👤</div>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <button
            type="button"
            onClick={() => navigate('/staff')}
            style={{
              backgroundColor: '#1e293b',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            ← Back to Staff
          </button>

          <h2 className="form-title">
            Book an Appointment
            {formData.providerName && (
              <span style={{ display: 'block', fontSize: '18px', marginTop: '5px' }}>
                with {formData.providerName}
              </span>
            )}
          </h2>

          {providerAvailability.length > 0 && (
            <>
              <label>Choose from available slots</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '1rem' }}>
                {providerAvailability.map(({ day, time }, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleAvailabilityClick(day, time)}
                    style={{
                      padding: '8px 14px',
                      backgroundColor: '#0d9488',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    {day} at {time}
                  </button>
                ))}
              </div>
            </>
          )}

          <label>City Name</label>
          <input name="city" value={formData.city} onChange={handleChange} />

          <label>Location</label>
          <input name="location" value={formData.location} onChange={handleChange} />

          <label>Hospital</label>
          <input name="hospital" value={formData.hospital} onChange={handleChange} />

          <label>Date</label>
          <input name="date" value={formData.date} placeholder="Click an availability above or type manually" onChange={handleChange} />

          <label>Time</label>
          <input name="time" value={formData.time} placeholder="e.g. 11:00" onChange={handleChange} />

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
