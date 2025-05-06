import React, { useState } from 'react';
import './style.css';

export default function Appointment() {
  const [formData, setFormData] = useState({
    city: '',
    location: '',
    hospital: '',
    date: '',
    time: '',
    consultationType: '',
    problem: '',
    level: '',
  });

  const [error, setError] = useState('');  // State for displaying error messages
  const [isSubmitting, setIsSubmitting] = useState(false); // To disable button while submitting

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation check
    if (!formData.city || !formData.location || !formData.hospital || !formData.date || !formData.time || !formData.consultationType || !formData.problem || !formData.level) {
      setError('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:3000/api/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Appointment booked successfully!');
        console.log('Server Response:', result);
        setFormData({
          city: '',
          location: '',
          hospital: '',
          date: '',
          time: '',
          consultationType: '',
          problem: '',
          level: '',
        });
      } else {
        console.error('Server responded with error:', result);
        alert('Failed to book appointment: ' + result?.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Fetch failed:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      {/* Main Content */}
      <main className="main-content">
        <div className="topbar">
          <input className="search-bar" type="text" placeholder="Search Appointments, patients, etc" />
          <div className="user-icon">👤</div>
        </div>

        {/* Error Message */}
        {error && <div className="error-message">{error}</div>}

        <form className="form" onSubmit={handleSubmit}>
          <h2 className="form-title">Appointment Booking</h2>

          <label>City Name</label>
          <input name="city" placeholder="Name" onChange={handleChange} value={formData.city} />

          <label>Location</label>
          <input name="location" placeholder="Upload location" onChange={handleChange} value={formData.location} />

          <label>Hospital</label>
          <input name="hospital" placeholder="Select Hospital" onChange={handleChange} value={formData.hospital} />

          <label>Date</label>
          <input name="date" type="date" onChange={handleChange} value={formData.date} />

          <label>Time</label>
          <input name="time" type="time" onChange={handleChange} value={formData.time} />

          <label>Consultation Type</label>
          <input name="consultationType" placeholder="Select Consultation type" onChange={handleChange} value={formData.consultationType} />

          <label>Problem</label>
          <textarea name="problem" placeholder="Describe the problem" onChange={handleChange} value={formData.problem} />

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

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Book'}
          </button>
        </form>
      </main>
    </div>
  );
}
