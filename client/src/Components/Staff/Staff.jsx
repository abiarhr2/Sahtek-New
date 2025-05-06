// src/Components/Staff.jsx
import React from 'react'
import './Staff.css'

function Staff() {
  return (
    <div className="staff-container">
      <div className="search-tool">
        <h2>Search Tool</h2>
        <div className="search-fields">
          <input type="text" placeholder="Which city?" />
          <input type="text" placeholder="Hospital name" />
          <input type="text" placeholder="Health issue" />
          <input type="text" placeholder="Doctor or Nurse?" />
          <button className="search-button">🔍</button>
        </div>
      </div>

      <div className="staff-section">
        <h3>Doctors</h3>
        <div className="card-list">
          {[1,2,3].map((_, index) => (
            <div key={index} className="staff-card">
              <div className="profile-pic"></div>
              <h4>John Karm</h4>
              <p>Generalist</p>
              <p>City...</p>
              <button className="more-button">More</button>
            </div>
          ))}
        </div>

        <h3>Nurses</h3>
        <div className="card-list">
          {[1,2,3].map((_, index) => (
            <div key={index} className="staff-card">
              <div className="profile-pic"></div>
              <h4>John Karm</h4>
              <p>Generalist</p>
              <p>City...</p>
              <button className="more-button">More</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Staff
