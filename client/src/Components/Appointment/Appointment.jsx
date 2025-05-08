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
    patientName: '',
    patientEmail: '',
    doctor: ''
  });

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConsultationTypes, setShowConsultationTypes] = useState(false);

  const doctors = [
    { name: 'Dr. Ait Taleb', specialty: 'Cardiology', location: 'Ifrane', times: ['09:00', '11:00'] },
    { name: 'Dr. Chraibi', specialty: 'Neurology', location: 'Fes', times: ['10:00', '12:00'] },
    { name: 'Dr. Bennani', specialty: 'Cardiology', location: 'Meknes', times: ['13:00', '15:00'] }
  ];

  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [consultationTypes, setConsultationTypes] = useState([]);

  const cities = ['Ifrane', 'Fes', 'Meknes'];

  // Handle city selection
  const handleCityChange = (e) => {
    const city = e.target.value;
    setFormData({ ...formData, city, location: '', doctor: '', time: '' });
    setFilteredDoctors([]);
    setAvailableTimes([]);
    setLocations(getLocations(city));
    setConsultationTypes([]);
  };

  // Get locations based on city
  const getLocations = (city) => {
    switch (city) {
      case 'Ifrane':
        return ['Location A', 'Location B'];
      case 'Fes':
        return ['Location C', 'Location D'];
      case 'Meknes':
        return ['Location E', 'Location F'];
      default:
        return [];
    }
  };

  // Handle location selection
  const handleLocationChange = (e) => {
    const location = e.target.value;
    setFormData({ ...formData, location, doctor: '', time: '' });
    setFilteredDoctors(doctors.filter(doc => doc.location === location));
    setConsultationTypes(getConsultationTypes(location));
  };

  // Get consultation types based on location
  const getConsultationTypes = (location) => {
    const locationDoctors = doctors.filter(doc => doc.location === location);
    return Array.from(new Set(locationDoctors.map(doc => doc.specialty)));
  };

  // Handle consultation type change
  const handleConsultationTypeChange = (e) => {
    const consultationType = e.target.value;
    const matchedDoctors = doctors.filter(doc =>
      doc.specialty.toLowerCase() === consultationType.toLowerCase() && doc.location === formData.location
    );
    setFilteredDoctors(matchedDoctors);
    setFormData({ ...formData, consultationType, doctor: '', time: '' });
    setAvailableTimes([]);
  };

  // Handle doctor change
  const handleDoctorChange = (e) => {
    const doctorName = e.target.value;
    const selectedDoctor = doctors.find(doc => doc.name === doctorName);
    setAvailableTimes(selectedDoctor ? selectedDoctor.times : []);
    setFormData({ ...formData, doctor: doctorName, time: '' });
  };

  // Handle regular field update
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ['patientName', 'patientEmail', 'city', 'location', 'hospital', 'date', 'time', 'consultationType', 'problem', 'level'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());

    if (missingFields.length > 0) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Failed to book appointment');

      alert('Appointment booked successfully!');
      setFormData({
        city: '',
        location: '',
        hospital: '',
        date: '',
        time: '',
        consultationType: '',
        problem: '',
        level: '',
        patientName: '',
        patientEmail: '',
        doctor: ''
      });
      setFilteredDoctors([]);
      setAvailableTimes([]);

    } catch (error) {
      console.error('Booking error:', error);
      setError(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <main className="main-content">
        <div className="topbar">
          <div className="user-icon">👤</div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form className="form" onSubmit={handleSubmit}>
          <h2 className="form-title">Appointment Booking</h2>

          <label>Your Name*</label>
          <input name="patientName" placeholder="Full Name" onChange={handleChange} value={formData.patientName} required />

          <label>Your Email*</label>
          <input name="patientEmail" type="email" placeholder="Email Address" onChange={handleChange} value={formData.patientEmail} required />

          {/* City Selection */}
          <label>City*</label>
          <select name="city" onChange={handleCityChange} value={formData.city} required>
            <option value="">-- Select City --</option>
            {cities.map((city, i) => (
              <option key={i} value={city}>{city}</option>
            ))}
          </select>

          {/* Location Selection */}
          {formData.city && (
            <>
              <label>Location*</label>
              <select name="location" onChange={handleLocationChange} value={formData.location} required>
                <option value="">-- Select Location --</option>
                {locations.map((location, i) => (
                  <option key={i} value={location}>{location}</option>
                ))}
              </select>
            </>
          )}

          {/* Consultation Type */}
          {formData.location && (
            <>
              <label>Consultation Type*</label>
              <select name="consultationType" onChange={handleConsultationTypeChange} value={formData.consultationType} required>
                <option value="">-- Select Consultation Type --</option>
                {consultationTypes.map((type, i) => (
                  <option key={i} value={type}>{type}</option>
                ))}
              </select>
            </>
          )}

          {/* Doctor Selection */}
          {filteredDoctors.length > 0 && (
            <>
              <label>Select Doctor*</label>
              <select name="doctor" onChange={handleDoctorChange} value={formData.doctor} required>
                <option value="">-- Select Doctor --</option>
                {filteredDoctors.map((doc, i) => (
                  <option key={i} value={doc.name}>{doc.name}</option>
                ))}
              </select>
            </>
          )}

          {/* Time Slot Selection */}
          {availableTimes.length > 0 && (
            <>
              <label>Select Time*</label>
              <select name="time" onChange={handleChange} value={formData.time} required>
                <option value="">-- Select Time --</option>
                {availableTimes.map((time, i) => (
                  <option key={i} value={time}>{time}</option>
                ))}
              </select>
            </>
          )}

          <label>Problem/Reason*</label>
          <textarea name="problem" placeholder="Describe your symptoms or reason for appointment" onChange={handleChange} value={formData.problem} required />

          <label>Urgency Level*</label>
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

          <button type="submit" className="submit-btn" disabled={isSubmitting || !formData.level}>
            {isSubmitting ? 'Submitting...' : 'Book Appointment'}
          </button>
        </form>
      </main>
    </div>
  );
}
