import React, { useState, useEffect } from 'react';

const AdminDashboard = ({ user, onLogout }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/admin/patients`);
      if (response.ok) {
        const data = await response.json();
        setPatients(data);
      }
    } catch (error) {
      console.error("Failed to fetch patients:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pro-dashboard">
      <aside className="pro-sidebar admin-theme">
        <div className="sidebar-brand">
          <span className="brand-emoji">🔐</span>
          <h3>Admin<span>Console</span></h3>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active">
            <span className="nav-icon">👥</span> Patient Registry
          </button>
          <button className="nav-item">
            <span className="nav-icon">📊</span> System Health
          </button>
          <button className="nav-item">
            <span className="nav-icon">⚙️</span> Settings
          </button>
        </nav>
        <div className="sidebar-footer">
          <button onClick={onLogout} className="logout-btn">
            <span className="nav-icon">🚪</span> Logout
          </button>
        </div>
      </aside>

      <main className="pro-content">
        <header className="pro-header">
          <div className="header-search">
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="header-user">
            <div className="user-text">
              <p className="user-name">Administrator</p>
              <p className="user-role">Super Admin</p>
            </div>
            <div className="user-avatar admin">A</div>
          </div>
        </header>

        <section className="dashboard-view">
          <div className="view-title">
            <h2>Patient Registration Database</h2>
            <p>Managing all user records registered via the patient portal.</p>
          </div>

          <div className="stats-cards">
            <div className="stat-card admin">
              <div className="card-info">
                <p className="label">Total Patients</p>
                <p className="value">{patients.length}</p>
              </div>
            </div>
            <div className="stat-card admin">
              <div className="card-info">
                <p className="label">New Registrations (Today)</p>
                <p className="value">0</p>
              </div>
            </div>
          </div>

          <div className="pro-card glass-light full-width">
            <div className="card-header">
              <h3>Registered Patient Profiles</h3>
              <button className="pro-btn-secondary small" onClick={fetchPatients}>Refresh Data</button>
            </div>
            
            {loading ? (
              <div className="loading-state">Loading records...</div>
            ) : (
              <table className="pro-table">
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Email Address</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.length > 0 ? filteredPatients.map((patient, index) => {
                    const patientFullName = `${patient.first_name} ${patient.last_name}`.trim();
                    return (
                      <tr key={index}>
                        <td>
                          <div className="table-user">
                            <div className="mini-avatar">{patient.first_name[0].toUpperCase()}</div>
                            {patientFullName}
                          </div>
                        </td>
                        <td>{patient.email}</td>
                        <td><span className="role-tag">{patient.role}</span></td>
                        <td><span className="status-badge complete">Active</span></td>
                        <td><button className="action-link">Manage</button></td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center', padding: '40px' }}>
                        No patients found in database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
