import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './History.css';

// A function to decode the JWT token and get the user's email
const getPatientEmailFromToken = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1])); // Decode JWT token
    return decoded.email; // Assuming the email is in the token payload
  } catch (error) {
    console.error('Failed to decode token', error);
    return null;
  }
};

const History = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token'); // Get JWT token from localStorage

        if (!token) {
          throw new Error('No token found!');
        }

        const patientEmail = getPatientEmailFromToken(token); // Get patient email from the token

        if (!patientEmail) {
          throw new Error('Invalid token. No email found.');
        }

        const response = await fetch(`http://localhost:3000/api/history?patientEmail=${patientEmail}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Sending the token with the request
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch appointments');
        }

        const data = await response.json();
        setAppointments(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [location.state]);

  if (loading) {
    return (
      <div className="main-content">
        <div className="history-page">
          <p>Loading appointments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-content">
        <div className="history-page">
          <p className="error-message">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="history-page">
        <h2 className="history-title">Appointment History</h2>
        <div className="appointments-list">
          {appointments.length === 0 ? (
            <p className="no-appointments">No appointments found</p>
          ) : (
            appointments.map((appt) => (
              <div key={appt._id} className={`appointment-card ${appt.level.toLowerCase()}`}>
                <div className="appointment-info">
                  <h3>{appt.consultationType || appt.title}</h3>
                  <p><strong>Doctor:</strong> {appt.doctor}</p>
                  <p><strong>Hospital:</strong> {appt.hospital}, {appt.city}</p>
                  <p><strong>Problem:</strong> {appt.problem}</p>
                </div>
                <div className="appointment-meta">
                  <span className="appointment-date">
                    {new Date(appt.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    {appt.time && ` at ${appt.time}`}
                  </span>
                  <div className="appointment-status">
                    <span className={`urgency ${appt.level.toLowerCase()}`}>
                      {appt.level}
                    </span>
                    {appt.status && (
                      <span className={`status ${appt.status.toLowerCase()}`}>
                        {appt.status}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {appointments.length > 0 && (
          <button className="load-more">Load more...</button>
        )}
      </div>
    </div>
  );
};

export default History;
