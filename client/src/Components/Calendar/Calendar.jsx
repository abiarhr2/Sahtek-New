import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import Sidebar from "../Sidebar/Sidebar";

const localizer = momentLocalizer(moment);

function CalendarView() {
  const [events, setEvents] = useState([]);
  const [currentView, setCurrentView] = useState(Views.MONTH);

  useEffect(() => {
    // Fetch appointments directly
    const fetchScheduledAppointments = async () => {
      try {
        const response = await fetch("/api/calendar"); // Ensure the correct API endpoint for appointments
        if (!response.ok) throw new Error("Failed to fetch appointments");
        const data = await response.json();

        return data.map((appt) => ({
          title: `Appointment - ${appt.patientName}`,
          start: new Date(appt.start), // Ensure 'start' and 'end' keys are correctly mapped
          end: new Date(appt.end),
          allDay: false,
          description: appt.description || "No additional notes.",
          type: "appointment",
        }));
      } catch (error) {
        console.error("Appointment Fetch Error:", error);
        return [];
      }
    };

    // Load all events (appointments in this case)
    const loadAllEvents = async () => {
      const appointments = await fetchScheduledAppointments();
      setEvents(appointments); // Only set appointments
    };

    loadAllEvents();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main">
        <div className="content">
          <div style={{ height: "100vh", padding: "20px" }}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              view={currentView}
              onView={(view) => setCurrentView(view)}
              views={["month", "week", "day", "agenda"]}
              
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: event.type === "appointment" ? "#20B2AA" : "#40E0D0",
                  color: "#fff",
                  borderRadius: "4px",
                },
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalendarView;
