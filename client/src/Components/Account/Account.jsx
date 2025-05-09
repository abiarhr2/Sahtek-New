import React, { useState } from 'react';
import './Account.css';

function Account() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    about: '',
    photo: null,
  });

  // Handle text input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  };

  // Handle photo input change
  const handlePhotoChange = (e) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      photo: e.target.files[0],
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData object to send data with the photo
    const formData = new FormData();
    formData.append('name', profile.name);
    formData.append('email', profile.email);
    formData.append('phone', profile.phone);
    formData.append('about', profile.about);
    if (profile.photo) {
      formData.append('photo', profile.photo);
    }

    try {
      const response = await fetch('http://localhost:3000/api/account', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      alert(result.message); // Show success message

    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div className="account-page">
      <div className="account-card">
        <h2>Hello, {profile.name || 'Abir'}</h2>
        <p>Joined in 2021</p>

        <div className="account-form">
          <div className="profile-section">
            <div className="profile-pic">
              {profile.photo ? (
                <img
                  src={URL.createObjectURL(profile.photo)}
                  alt="Profile Preview"
                />
              ) : (
                <span>👤</span>
              )}
            </div>

            <label className="upload-button">
              Choose Photo
              <input type="file" onChange={handlePhotoChange} hidden />
            </label>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" value={profile.name} onChange={handleChange} placeholder="Full Name" />

            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={profile.email} onChange={handleChange} placeholder="Enter email" />

            <label htmlFor="phone">Phone Number</label>
            <input id="phone" type="tel" value={profile.phone} onChange={handleChange} placeholder="Phone number" />

            <label htmlFor="about">About</label>
            <textarea id="about" value={profile.about} onChange={handleChange} placeholder="Tell us about yourself..."></textarea>

            <div className="buttons">
              <button type="submit" className="save-button">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Account;