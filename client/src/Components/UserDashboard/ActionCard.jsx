import React from 'react';
import { useNavigate } from 'react-router-dom';

const actions = [
  { icon: '➕', title: 'Book Appointment', desc: 'Schedule a new appointment', path: '/staff' },
  { icon: '📄', title: 'Medical History', desc: 'View your latest test results', path: '/medicalHistory' },
];

const ActionCards = () => {
  const navigate = useNavigate();  // Hook for programmatic navigation

  // Function to handle card click and navigate
  const handleCardClick = (path) => {
    navigate(path);  // Navigate to the specified path
  };

  return (
    <div className="action-cards">
      {actions.map((action, idx) => (
        <div
          className="action-card"
          key={idx}
          onClick={() => handleCardClick(action.path)}  // Navigate on card click
        >
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
