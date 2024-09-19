import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AgencyDashboard from './components/AgencyDashboard';
import AdminDashboard from './components/AdminDashboard';
import RegisterAgency from './components/RegisterAgency';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AgencyDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/register-agency" element={<RegisterAgency />} />

      </Routes>
    </Router>
  );
}

export default App;
