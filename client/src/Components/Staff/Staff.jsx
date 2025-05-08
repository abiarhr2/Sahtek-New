import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Staff.css';

const Staff = () => {
  const [searchParams, setSearchParams] = useState({
    region: 'Fès-Meknès',
    city: '',
    hospital: '',
    healthIssue: '',
    providerType: ''
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/services/search', searchParams);
      setResults(response.data);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const StaffCard = ({ provider }) => (
    <div
      className="staff-card"
      onClick={() =>
        navigate('/appointment', {
          state: {
            city: provider.city,
            location: provider.location,
            hospital: provider.location,
            providerName: provider.name,
            availableDays: provider.availableDays || [] // ✅ pass availability
          }
        })
      }
      style={{ cursor: 'pointer' }}
    >
      <div className="profile-pic" />
      <h4>{provider.name || 'Unknown'}</h4>
      <p>{provider.specialty || 'Generalist'}</p>
      <p>{provider.city || 'City...'}</p>
      <button className="more-button">More</button>
    </div>
  );

  const section = (title, items) => (
    <div className="staff-subsection">
      <h3>{title}</h3>
      <div className="card-list">
        {items.length === 0 ? <p>No results found</p> : items.map((item, index) => (
          <StaffCard key={index} provider={item} />
        ))}
      </div>
    </div>
  );

  const doctors = results.filter(r => r.type?.toLowerCase() === 'doctor');
  const nurses = results.filter(r => r.type?.toLowerCase() === 'nurse');

  return (
    <div className="staff-container">
      <div className="search-tool">
        <h2>Search Tool</h2>
        <form onSubmit={handleSearch} className="search-fields">
          <input type="text" name="region" value="Fès-Meknès" readOnly disabled />

          <select name="city" value={searchParams.city} onChange={handleChange}>
            <option value="">Which city?</option>
            <option value="Fès">Fès</option>
            <option value="Meknès">Meknès</option>
            <option value="Ifrane">Ifrane</option>
            <option value="Sefrou">Sefrou</option>
            <option value="Taza">Taza</option>
          </select>

          <select name="hospital" value={searchParams.hospital} onChange={handleChange}>
            <option value="">Hospital name</option>
            <option value="CHU Hassan II">CHU Hassan II</option>
            <option value="Hôpital Ghassani Public">Hôpital Ghassani Public</option>
            <option value="CH Mohamed V">CH Mohamed V</option>
            <option value="Hôpital Provincial de Sefrou">Hôpital Provincial de Sefrou</option>
            <option value="Centre Hospitalier Provincial de Taza">Centre Hospitalier Provincial de Taza</option>
            <option value="Hôpital Public Ifrane">Hôpital Public Ifrane</option>
          </select>

          <select name="healthIssue" value={searchParams.healthIssue} onChange={handleChange}>
            <option value="">Health issue</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Internal Medicine">Internal Medicine</option>
            <option value="Emergency Care">Emergency Care</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Maternity">Maternity</option>
            <option value="General Medicine">General Medicine</option>
            <option value="ICU">ICU</option>
          </select>

          <select name="providerType" value={searchParams.providerType} onChange={handleChange}>
            <option value="">Doctor or Nurse?</option>
            <option value="Doctor">Doctor</option>
            <option value="Nurse">Nurse</option>
          </select>

          <button type="submit" className="search-button">🔍</button>
        </form>
      </div>

      <div className="staff-section">
        {loading ? <p>Loading...</p> : (
          <>
            {section('Doctors', doctors)}
            {section('Nurses', nurses)}
          </>
        )}
      </div>
    </div>
  );
};

export default Staff;
