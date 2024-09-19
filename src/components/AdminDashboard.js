import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [agencies, setAgencies] = useState([]);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const { data } = await axios.get('/api/admin/agencies');
        setAgencies(data);
      } catch (error) {
        console.error('Error fetching agencies:', error);
      }
    };
    
    fetchAgencies();
  }, []);

  const handleToggleStatus = async (id, isActive) => {
    try {
      await axios.put(`/api/admin/agencies/${id}/toggle-status`);
      setAgencies(agencies.map(agency => 
        agency._id === id ? { ...agency, isActive: !isActive } : agency
      ));
    } catch (error) {
      console.error('Error toggling agency status:', error);
    }
  };

  const handleEdit = (id) => {
    // Navigate to edit agency page
    // e.g., using React Router: history.push(`/admin/agencies/edit/${id}`);
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {agencies.map(agency => (
            <tr key={agency._id}>
              <td>{agency.companyName}</td>
              <td>{agency.companyEmail}</td>
              <td>{agency.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <button onClick={() => handleEdit(agency._id)}>Edit</button>
                <button onClick={() => handleToggleStatus(agency._id, agency.isActive)}>
                  {agency.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
