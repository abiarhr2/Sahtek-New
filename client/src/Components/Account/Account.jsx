import React, { useState } from 'react';
import './Account.css';

function Account() {
  return (
    <div className="account-page">
      <div className="account-card">
        <h2>Hello, John Doe</h2>
        <p>Joined in 2021</p>
        
        <div className="account-form">
          <div className="profile-section">
            <div className="profile-pic"></div>
            <button className="upload-button">Upload a Photo</button>
          </div>

          <div className="identity-verification">
            <h3>Identity Verification</h3>
            <p>here here verify identity</p>
            <div className="verified-info">
              {/* Future identity info */}
            </div>
          </div>

          <form>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder="Full Name" />

            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="Enter email" />

            <label htmlFor="phone">Phone Number</label>
            <input id="phone" type="tel" placeholder="Phone number" />

            <label htmlFor="about">About</label>
            <textarea id="about" placeholder="Tell us about yourself..."></textarea>

            <div className="buttons">
              <button type="button" className="cancel-button">Cancel</button>
              <button type="submit" className="save-button">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Account;
