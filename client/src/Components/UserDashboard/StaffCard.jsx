// RegisterCard.jsx
import React from 'react';
import './SectionCard.css';
import { useNavigate } from 'react-router-dom';

const StaffCard = () => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <h3>Meet Our Hospital Staff</h3>
      <p>Explore the profiles and specialties of our dedicated hospital staff.</p>
      <button className="green-btn" onClick={() => navigate('/staffcard')}>
        View Staff
      </button>
    </div>
  );
};

export default StaffCard;
