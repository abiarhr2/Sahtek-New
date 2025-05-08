import React from 'react';
import './Dashboard.css'; // Assuming you have a CSS file for styling

const AppointmentItem = ({ date, doctor, specialty, time }) => {
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
        <button className="reschedule">✏️ Reschedule</button>
        <button className="cancel">❌ Cancel</button>
      </div>
    </div>
  );
};

export default AppointmentItem;
