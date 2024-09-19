import React, { useState } from 'react';
import '../styles/RegisterAgency.css'; 
import { useGlobalContext } from '../context/GlobalState';
import { createAgency } from '../api/CRUDApi'; // Assuming this API function exists
import { useNavigate } from 'react-router-dom';

const RegisterAgency = () => {
  const {agencyEmail } = useGlobalContext(); 
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyEmail, setCompanyEmail] = useState(agencyEmail || '');
  const [numStaff, setNumStaff] = useState('');
  const [projects, setProjects] = useState('');
  const [performanceSummary, setPerformanceSummary] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Calculate the number of non-whitespace characters in the performance summary
  const characterCount = performanceSummary.length;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (characterCount > 1000) {
      setError('Summary/Overview of performance must not exceed 500 characters.');
      return;
    }

    if (!companyName || !companyAddress || !companyEmail || !numStaff || !projects || !performanceSummary) {
      setError('All fields are required.');
      return;
    }
        const agencyData = {
        companyName,
        companyAddress,
        companyEmail,
        numStaff,
        projects,
        performanceSummary
      };
      try {
        await createAgency(agencyData);
        navigate('/login');
        console.log('Agency data submitted:', agencyData);
        setSuccess(true); // Show success message after submission


      } catch (err) {
      setError('Failed to register agency. Please try again.');
    }
  };

  return (
    <div className="register-agency-container">
      <h2>Register Agency</h2>
      <form className="register-agency-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="companyName">Company Name:</label>
          <input
            id="companyName"
            type="text"
            placeholder="Enter company name"
            className="form-input"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            type="text"
            placeholder="Enter company address"
            className="form-input"
            value={companyAddress}
            onChange={(e) => setCompanyAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactInfo">Company Email:</label>
          <input
            id="contactEmail"
            type="text"
            placeholder="Enter company contact Email"
            className="form-input"
            value={companyEmail}
            onChange={(e) => setCompanyEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numStaff">Number of Staff:</label>
          <input
            id="numStaff"
            type="number"
            placeholder="Enter number of staff"
            className="form-input"
            value={numStaff}
            onChange={(e) => setNumStaff(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numStaff">Number of Projects:</label>
          <input
            id="projects"
            type="number"
            placeholder="Enter number of company projects"
            className="form-input"
            value={projects}
            onChange={(e) => setProjects(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="performanceSummary">Summary/Overview of Performance:</label>
          <textarea
            id="performanceSummary"
            placeholder="Enter a brief summary of the agency's performance (max 500 characters)"
            className="form-input"
            value={performanceSummary}
            onChange={(e) => setPerformanceSummary(e.target.value)}
            maxLength="500"
            required
          />
          <div className="character-counter">
            {characterCount}/1000
          </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">Agency registered successfully!</div>}
        <button type="submit" className="register-agency-button">Register Agency</button>
      </form>
    </div>
  );
};

export default RegisterAgency;
