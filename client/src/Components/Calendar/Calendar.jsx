import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import Sidebar from "../Sidebar/Sidebar";

const localizer = momentLocalizer(moment);

function CalendarView() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentView, setCurrentView] = useState(Views.MONTH);

  useEffect(() => {
    const fetchToDoTasks = async () => {
      try {
        const response = await fetch("/api/todo/");
        if (!response.ok) throw new Error("Failed to fetch tasks");
        const data = await response.json();

        return data.map((task) => ({
          title: task.assignment_name,
          start: new Date(task.due_date),
          end: new Date(task.due_date),
          allDay: true,
          assignment_url: task.assignment_url,
          description: task.description,
          type: "task",
        }));
      } catch (error) {
        console.error("To-Do Task Error:", error);
        return [];
      }
    };

    const fetchScheduledAppointments = async () => {
      try {
        const response = await fetch("/api/appointments/");
        if (!response.ok) throw new Error("Failed to fetch appointments");
        const data = await response.json();

        return data.map((appt) => ({
          title: `Appointment - ${appt.patient_name}`,
          start: new Date(appt.start_time),
          end: new Date(appt.end_time),
          allDay: false,
          description: appt.notes || "No additional notes.",
          type: "appointment",
        }));
      } catch (error) {
        console.error("Appointment Fetch Error:", error);
        return [];
      }
    };

    const loadAllEvents = async () => {
      const [tasks, appointments] = await Promise.all([
        fetchToDoTasks(),
        fetchScheduledAppointments(),
      ]);
      setEvents([...tasks, ...appointments]);
    };

    loadAllEvents();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedEvent(null);
  };

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
              style={{ height: 600, backgroundColor: "transparent" }}
              onSelectEvent={handleEventClick}
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor:
                    event.type === "appointment" ? "#20B2AA" : "#40E0D0",
                  color: "#fff",
                  borderRadius: "4px",
                },
              })}
            />
          </div>
        </div>
      </div>

      {showPopup && selectedEvent && (
        <div className="popup turquoise">
          <div className="popup-content">
            <h2>{selectedEvent.title}</h2>
            <p>
              <strong>Start:</strong> {selectedEvent.start.toString()}
            </p>
            <p>
              <strong>End:</strong> {selectedEvent.end.toString()}
            </p>
            <p>
              <strong>Description:</strong>{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: selectedEvent.description,
                }}
              ></span>
            </p>
            {selectedEvent.assignment_url && (
              <p>
                <strong>Assignment:</strong>{" "}
                <a
                  href={selectedEvent.assignment_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Assignment
                </a>
              </p>
            )}
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarView;
