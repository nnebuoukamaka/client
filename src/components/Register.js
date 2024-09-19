import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/authApi';
import '../styles/Register.css'
import { useGlobalContext } from '../context/GlobalState';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('agency'); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {setAgencyEmail } = useGlobalContext();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }
    setAgencyEmail(email);

    
    try {
      const userData = { name, role, email, password};
      await register(userData);
      if(role === "agency"){
          navigate('/register-agency');
      }else 
      {
        navigate('/login')
      }
    } catch (err) {
      console.error('Backend error:', err.response?.data || err.message); 
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div>
        <h2 className="welcome-title">Welcome to The Agency Aggregator</h2>
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your name" 
            required 
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="agency">Agency</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder= { role === "agency" ? "Enter your company/Agency Email" : "Enter your email" }
            required 
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password" 
            required 
          />
        </div>
       
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
    </div>

  );
};

export default Register;
