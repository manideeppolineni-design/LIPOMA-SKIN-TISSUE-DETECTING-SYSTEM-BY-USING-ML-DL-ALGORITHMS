import React, { useState } from 'react';

const DoctorDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="pro-dashboard">
      <aside className="pro-sidebar professional">
        <div className="sidebar-brand">
          <span className="brand-emoji">🩺</span>
          <h3>Doc<span>Portal</span></h3>
        </div>
        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            <span className="nav-icon">📊</span> Analytics
          </button>
          <button className={`nav-item ${activeTab === 'patients' ? 'active' : ''}`} onClick={() => setActiveTab('patients')}>
            <span className="nav-icon">👥</span> Patient Cases
          </button>
          <button className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>
            <span className="nav-icon">📝</span> AI Reports
          </button>
          <button className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            <span className="nav-icon">👤</span> Profile
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
            <input type="text" placeholder="Search patient ID, name, or report..." />
          </div>
          <div className="header-user">
            <div className="user-text">
              <p className="user-name">Dr. {user.name}</p>
              <p className="user-role">Senior Oncologist</p>
            </div>
            <div className="user-avatar doctor">{user.name[0].toUpperCase()}</div>
          </div>
        </header>

        <section className="dashboard-view">
          <div className="view-title">
            <h2>Clinical Dashboard</h2>
            <p>Real-time AI-assisted diagnostic oversight.</p>
          </div>

          <div className="stats-cards">
            <div className="stat-card doctor">
              <div className="card-info">
                <p className="label">Total Cases</p>
                <p className="value">1,284</p>
              </div>
              <div className="card-trend up">↑ 12%</div>
            </div>
            <div className="stat-card doctor">
              <div className="card-info">
                <p className="label">Pending Review</p>
                <p className="value">18</p>
              </div>
            </div>
            <div className="stat-card doctor">
              <div className="card-info">
                <p className="label">AI Confidence Avg.</p>
                <p className="value">98.2%</p>
              </div>
              <div className="card-trend up">↑ 0.5%</div>
            </div>
            <div className="stat-card doctor">
              <div className="card-info">
                <p className="label">Resolved Today</p>
                <p className="value">42</p>
              </div>
            </div>
          </div>

          <div className="pro-card glass-light full-width">
            <div className="card-header">
              <h3>Active Patient Cases</h3>
              <div className="header-actions">
                <select className="table-filter">
                  <option>All Cases</option>
                  <option>High Risk</option>
                  <option>Moderate</option>
                </select>
                <button className="pro-btn-primary small">Report Export</button>
              </div>
            </div>
            <table className="pro-table">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>ID</th>
                  <th>Latest Analysis</th>
                  <th>Risk Level</th>
                  <th>AI Score</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="table-user">
                      <div className="mini-avatar">JS</div>
                      John Smith
                    </div>
                  </td>
                  <td>#PX-0912</td>
                  <td>Oct 22, 2024</td>
                  <td><span className="risk-badge low">Low</span></td>
                  <td>0.12</td>
                  <td><span className="status-badge complete">Completed</span></td>
                  <td><button className="action-link">Review</button></td>
                </tr>
                <tr>
                  <td>
                    <div className="table-user">
                      <div className="mini-avatar">SW</div>
                      Sarah Wilson
                    </div>
                  </td>
                  <td>#PX-1182</td>
                  <td>Oct 21, 2024</td>
                  <td><span className="risk-badge high">High</span></td>
                  <td>0.89</td>
                  <td><span className="status-badge pending">Awaiting Dr.</span></td>
                  <td><button className="action-link primary">Critical Review</button></td>
                </tr>
                <tr>
                  <td>
                    <div className="table-user">
                      <div className="mini-avatar">RD</div>
                      Robert Davis
                    </div>
                  </td>
                  <td>#PX-2201</td>
                  <td>Oct 20, 2024</td>
                  <td><span className="risk-badge med">Moderate</span></td>
                  <td>0.54</td>
                  <td><span className="status-badge complete">Completed</span></td>
                  <td><button className="action-link">Review</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DoctorDashboard;
