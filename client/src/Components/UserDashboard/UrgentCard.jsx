// RegisterCard.jsx
import React from 'react';
import './UrgentCard.css';

const UrgentCard = () => (
  <div className="card">
    <h3>Urgent Matter</h3>
    <p>Need immediate help? Call an ambulance now.</p>
    <a href="tel:15">
      <button className="red-btn">Call Ambulance</button>
    </a>
  </div>
);

export default UrgentCard;
