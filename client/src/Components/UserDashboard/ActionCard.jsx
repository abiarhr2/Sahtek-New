import React from 'react';

const actions = [
  { icon: '➕', title: 'Book Appointment', desc: 'Schedule a new appointment' },
  { icon: '📄', title: 'Test Results', desc: 'View your latest test results' },
  { icon: '💊', title: 'Refill Prescription', desc: 'Request a refill for meds' },
  { icon: '💰', title: 'Pay Bills', desc: 'View and pay your medical bills' },
];

const ActionCards = () => {
  return (
    <div className="action-cards">
      {actions.map((action, idx) => (
        <div className="action-card" key={idx}>
          <div className="action-icon">{action.icon}</div>
          <div className="action-content">
            <h4>{action.title}</h4>
            <p>{action.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActionCards;
