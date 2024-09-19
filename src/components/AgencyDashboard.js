import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AgencyDashboard.css';

const AgencyDashboard = () => {
  const [agency, setAgency] = useState({
    companyName: '',
    companyAddress: '',
    companyEmail: '',
    numStaff: '',
    projects: '',
    performanceSummary: '',
  });

  useEffect(() => {
    const fetchAgency = async () => {
      try {
        const { data } = await axios.get('/api/agencies/me'); // Replace with correct endpoint
        setAgency(data);
      } catch (error) {
        console.error('Error fetching agency details:', error);
      }
    };
    
    fetchAgency();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgency(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/agencies/${agency._id}`, agency);
      alert('Agency details updated successfully!');
    } catch (error) {
      console.error('Error updating agency details:', error);
    }
  };

  return (
    <div className="agency-dashboard">
      <h1>Agency Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={agency.companyName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={agency.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact Info:</label>
          <input
            type="text"
            name="contactInfo"
            value={agency.contactInfo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Company Email:</label>
          <input
            type="email"
            name="companyEmail"
            value={agency.companyEmail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Number of Staff:</label>
          <input
            type="number"
            name="numStaff"
            value={agency.numStaff}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Performance Summary:</label>
          <textarea
            name="performanceSummary"
            value={agency.performanceSummary}
            onChange={handleChange}
            maxLength="500"
            required
          />
          <div className="char-counter">
            {agency.performanceSummary.length}/500
          </div>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default AgencyDashboard;
