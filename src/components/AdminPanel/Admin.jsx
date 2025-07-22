// src/components/Admin/Admin.jsx
import { useState } from 'react';
import './Admin.css';

const AdminLogin = ({ onAdminLogin }) => {
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === "Jay&bee27") {
      onAdminLogin(true);
      setShowModal(false);
    } else {
      alert("Wrong password!");
    }
  };

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="admin-button"
      >
        Admin
      </button>

      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>Admin Login</h3>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
            <div className="admin-modal-actions">
              <button onClick={() => setShowModal(false)}>Cancel</button>
              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLogin;