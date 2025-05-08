import React from 'react';
import './History.css'; // Don't forget the CSS

const History = () => {
  const appointments = [
    {
      title: 'Heart problem',
      doctor: 'Dr. John Karm',
      hospital: 'Casablanca Ibnou Rochd Hospital',
      date: 'April, 23th 2024',
      urgency: 'Urgent'
    },
    {
      title: 'General Checking',
      doctor: 'Dr. John Karm',
      hospital: 'Casablanca Ibnou Rochd Hospital',
      date: 'April, 23th 2024',
      urgency: 'Medium'
    },
    {
      title: 'General Checking',
      doctor: 'Dr. John Karm',
      hospital: 'Tangier Private Hospital',
      date: 'April, 23th 2024',
      urgency: 'Normal'
    }
  ];

  return (
    <div className="main-content">
      <div className="history-page">
        <h2 className="history-title">Appointment History</h2>
        <div className="appointments-list">
          {appointments.map((appt, index) => (
            <div key={index} className="appointment-card">
              <div className="appointment-info">
                <h3>{appt.title}</h3>
                <p>{appt.doctor}</p>
                <p>{appt.hospital}</p>
              </div>
              <div className="appointment-meta">
                <span className="appointment-date">{appt.date}</span>
                <span className={`urgency ${appt.urgency.toLowerCase()}`}>{appt.urgency}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="load-more">Load more...</div>
      </div>
    </div>
  );
};

export default History;
