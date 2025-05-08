// RegisterCard.jsx
import React from 'react';
import {useNavigate} from 'react-router-dom';
import './SectionCard.css';

const AppointmentCard = () => {

  const navigate = useNavigate();

  return (
    <div className="card">
      <h3>Find an Appointment</h3>
      <p>Explore available appointments</p>
      <button className="green-btn" onClick={() => navigate('/appointment')}>
        Book Appointment
      </button>
    </div>
  );
};

export default AppointmentCard;
