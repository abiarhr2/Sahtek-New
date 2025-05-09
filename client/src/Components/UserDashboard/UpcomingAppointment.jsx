import React, { useState } from 'react';
import AppointmentItem from './AppointmentItem';

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([
    {
      date: 'JUN 10',
      doctor: 'Dr. Michael Chen',
      specialty: 'Cardiologist',
      time: '10:30 AM - 11:15 AM',
    },
    {
      date: 'JUN 24',
      doctor: 'Dr. Emily Martinez',
      specialty: 'Dermatologist',
      time: '2:00 PM - 2:45 PM',
    },
  ]);

  const cancelAppointment = (appointmentDate) => {
    setAppointments(appointments.filter((appt) => appt.date !== appointmentDate));
  };

  return (
    <div className="appointments-section">
      <div className="appointments-header">
        <h3>Upcoming Appointments</h3>
        <a href="#">View All →</a>
      </div>
      {appointments.map((appt, index) => (
        <AppointmentItem
          key={index}
          {...appt}
          onCancel={() => cancelAppointment(appt.date)} // Pass cancel function
        />
      ))}
    </div>
  );
};

export default UpcomingAppointments;
