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
    providerName: ''
  });

  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (location.state) {
      const { city, location: loc, hospital, providerName, availableDays = [] } = location.state;

      setFormData(prev => ({
        ...prev,
        city: city || '',
        location: loc || '',
        hospital: hospital || '',
        providerName: providerName || ''
      }));

      // Process available days (remove duplicates)
      const uniqueDates = [...new Set(availableDays)];
      setAvailableDates(uniqueDates);
    }
  }, [location.state]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setFormData(prev => ({ ...prev, date, time: '' }));
    
    // Generate time slots for the selected date
    const timeSlots = [
      { time: "09:00", display: "09:00 AM" },
      { time: "11:00", display: "11:00 AM" },
      { time: "14:00", display: "02:00 PM" },
    ];
    
    setAvailableTimeSlots(timeSlots);
  };

  const handleTimeSelect = (time) => {
    setFormData(prev => ({ ...prev, time }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="container">
      <main className="main-content">
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="form-title">
            Book an Appointment
            {formData.providerName && (
              <span className="provider-name"> with {formData.providerName}</span>
            )}
          </h2>

          {/* Step 1: Choose a Date */}
          <div className="form-section">
            <label>Choose a Date</label>
            <div className="date-picker">
              {availableDates.length > 0 ? (
                availableDates.map((date, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`date-option ${selectedDate === date ? 'selected' : ''}`}
                    onClick={() => handleDateSelect(date)}
                  >
                    {date}
                  </button>
                ))
              ) : (
                <p>No dates available</p>
              )}
            </div>
          </div>

          {/* Step 2: Choose a Time Slot (only shows when date is selected) */}
          {selectedDate && (
            <div className="form-section">
              <label>Available Time Slots</label>
              <div className="time-slots">
                {availableTimeSlots.length > 0 ? (
                  availableTimeSlots.map((slot, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`time-slot ${formData.time === slot.time ? 'selected' : ''}`}
                      onClick={() => handleTimeSelect(slot.time)}
                    >
                      {slot.display}
                    </button>
                  ))
                ) : (
                  <p>No time slots available</p>
                )}
              </div>
            </div>
          )}

          <button type="submit" className="submit-btn">Book Appointment</button>
        </form>
      </main>
    </div>
  );
}
