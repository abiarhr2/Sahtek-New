// RegisterCard.jsx
import React from 'react';
import './SectionCard.css';
import {useNavigate} from 'react-router-dom';

const RegisterCard = () => {
    const navigate = useNavigate();

return (    
  <div className="card">
    <h3>Register Now !</h3>
    <p>Explore available appointments by their categories/types...</p>
    <button className="green-btn" onClick ={() => navigate('/signup')}>Sign up</button>
  </div>
);
};

export default RegisterCard;
