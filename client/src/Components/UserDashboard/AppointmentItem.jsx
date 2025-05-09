import React from 'react';
import { useNavigate } from 'react-router-dom';

const AppointmentItem = ({ date, doctor, specialty, time, onCancel }) => {
  const navigate = useNavigate();

  return (
    <div className="appointment-card">
      <div className="appointment-date">
        <span>{date.split(' ')[0]}</span>
        <strong>{date.split(' ')[1]}</strong>
      </div>
      <div className="appointment-info">
        <h4>{doctor}</h4>
        <p>{specialty}</p>
        <p>{time}</p>
      </div>
      <div className="appointment-actions">
        <button className="reschedule" onClick={() => navigate('/appointment')}>
          ✏️ Reschedule
        </button>
        <button className="cancel" onClick={onCancel}>
          ❌ Cancel
        </button>
      </div>
    </div>
  );
};

export default AppointmentItem;
