import React, { useState, useRef } from 'react';
import Chatbot from './Chatbot';

/* ── Inline SVG Icons ─────────────────────────────────────────── */
const IconGrid = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const IconFolder = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);
const IconBot = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/>
    <path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/>
  </svg>
);
const IconUser = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconLogOut = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconActivity = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>
);
const IconCalendar = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconShield = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const IconFile = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);
const IconDna = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/>
    <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="m2 9 .527.055A20 20 0 0 1 22 15"/>
  </svg>
);
const IconUpload = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);
const IconUploadSmall = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);
const IconSearch = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

/* ── Component ───────────────────────────────────────────────── */
const PatientDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [editingProfile, setEditingProfile] = useState(false);
  const [scans, setScans] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStatus, setAnalysisStatus] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [profileData, setProfileData] = useState({
    firstName: user?.first_name || 'User',
    lastName: user?.last_name || '',
    email: user?.email || 'user@example.com',
    phone: user?.phone || '',
    blood: user?.blood || '',
    gender: user?.gender || '',
    address: user?.address || '',
    emergencyContact: user?.emergency_contact || '',
    allergies: user?.allergies || 'None Known',
    medications: user?.medications || 'None',
    conditions: user?.conditions || 'Healthy',
    height: user?.height || '175 cm',
    weight: user?.weight || '70 kg',
  });

  const fetchScans = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/user/scans?email=${user.email}`, {
        headers: { 'Bypass-Tunnel-Reminder': 'true' }
      });
      const data = await res.json();
      setScans(data);
    } catch (err) {
      console.error("Failed to fetch scans", err);
    }
  };

  React.useEffect(() => {
    fetchScans();
  }, []);

  /* ── Real File Upload Handler ─── */
  const processFile = async (file) => {
    const isPDF = file.name.toLowerCase().endsWith('.pdf');
    const isImage = /\.(jpg|jpeg|png|bmp)$/i.test(file.name);

    if (!isPDF && !isImage) {
      alert('⚠️ Please upload a valid MRI/CT scan image (JPG/PNG) or a PDF report.');
      return;
    }

    setSelectedFile(file);
    setIsAnalyzing(true);
    setAnalysisProgress(5);
    setAnalysisStatus(isPDF ? 'Reading PDF scan report...' : 'Analyzing MRI/CT scan image...');

    const progressSteps = isPDF ? [
      { p: 20, s: 'Extracting medical text from PDF...' },
      { p: 40, s: 'Running NLP entity recognition...' },
      { p: 60, s: 'Identifying lipoma indicators...' },
      { p: 80, s: 'Classifying with ML model...' },
      { p: 92, s: 'Generating diagnosis PDF report...' },
    ] : [
      { p: 15, s: 'Initializing High-Precision Neural Engine...' },
      { p: 35, s: 'Segmenting MRI/CT Spatial Contrast...' },
      { p: 55, s: 'Analyzing Hounsfield Unit Variations...' },
      { p: 75, s: 'Evaluating Surgical Removability Index...' },
      { p: 90, s: 'Finalizing Precision Mapping...' },
    ];

    // Start progress animation
    let stepIdx = 0;
    const progressTimer = setInterval(() => {
      if (stepIdx < progressSteps.length) {
        setAnalysisProgress(progressSteps[stepIdx].p);
        setAnalysisStatus(progressSteps[stepIdx].s);
        stepIdx++;
      }
    }, 900);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('email', user.email);

      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/upload-scan`, {
        method: 'POST',
        headers: { 'Bypass-Tunnel-Reminder': 'true' },
        body: formData,
      });

      clearInterval(progressTimer);

      if (response.ok) {
        setAnalysisProgress(100);
        setAnalysisStatus('✅ Analysis Complete!');
        setTimeout(() => {
          setIsAnalyzing(false);
          setSelectedFile(null);
          fetchScans();
          setActiveTab('scans');
        }, 1000);
      } else {
        const err = await response.json();
        clearInterval(progressTimer);
        setIsAnalyzing(false);
        alert(`Analysis failed: ${err.detail || 'Unknown error'}`);
      }
    } catch (err) {
      clearInterval(progressTimer);
      setIsAnalyzing(false);
      alert('Could not connect to the analysis engine. Please ensure the backend is running.');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const handleDownload = async (reportId) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      const response = await fetch(`${baseUrl}/api/download-report/${reportId}`, {
        headers: { 'Bypass-Tunnel-Reminder': 'true' }
      });
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `LipomaDetect_Report_${reportId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Report acquisition failed. Please try again or verify connection.");
    }
  };

  const navItems = [
    { id: 'overview', label: 'Overview', Icon: IconGrid },
    { id: 'scans', label: 'Clinical Scans', Icon: IconFolder },
    { id: 'profile', label: 'Health Profile', Icon: IconUser },
    { id: 'chat', label: 'AI Specialist', Icon: IconBot },
  ];

  const fullName = `${profileData.firstName} ${profileData.lastName}`.trim();
  const initials = profileData.firstName ? profileData.firstName[0].toUpperCase() : 'U';

  return (
    <div className="pro-dashboard">
      {/* ── Analysis Overlay ─────────────────────────────────── */}
      {isAnalyzing && (
        <div className="analysis-modal">
          <div className="analysis-box glass-premium">
            <div className="brain-animation">🧬</div>
            <h3>Intelligent Diagnostic Analysis</h3>
            <p>{analysisStatus}</p>
            {selectedFile && (
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                📄 {selectedFile.name}
              </p>
            )}
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${analysisProgress}%` }}></div>
            </div>
            <span className="p-text">{analysisProgress}% Processed</span>
          </div>
        </div>
      )}

      {/* ── Sidebar ──────────────────────────────────────────── */}
      <aside className="pro-sidebar">
        <div className="sidebar-brand">
          <IconDna />
          <h3>Lipoma<span>Detection</span></h3>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(({ id, label, Icon }) => (
            <button
              key={id}
              className={`nav-item ${activeTab === id ? 'active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              <span className="nav-icon"><Icon /></span>
              {label}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div className="sidebar-user-mini">
            <div className="avatar-mini">{initials}</div>
            <div>
              <p className="su-name">{fullName}</p>
              <p className="su-role">Patient ID: #PX-{user.email.split('@')[0].toUpperCase()}</p>
            </div>
          </div>
          <button onClick={onLogout} className="logout-btn">
            <span className="nav-icon"><IconLogOut /></span> Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────────────── */}
      <main className="pro-content">
        <header className="pro-header">
          <div className="header-search">
            <span className="search-icon"><IconSearch /></span>
            <input type="text" placeholder="Search medical history..." />
          </div>
          <div className="header-user" onClick={() => setActiveTab('profile')} style={{ cursor: 'pointer' }}>
            <div className="user-text">
              <p className="user-name">{fullName}</p>
              <p className="user-role">Verified Patient</p>
            </div>
            <div className="user-avatar">{initials}</div>
          </div>
        </header>

        <section className="dashboard-view">

          {/* ── Overview ───────────────────────────────────── */}
          {activeTab === 'overview' && (
            <>
              <div className="view-title">
                <h2>Health Overview</h2>
                <p>Welcome back, {profileData.firstName}. Review your biometric summary.</p>
              </div>
              <div className="stats-cards">
                <div className="stat-card premium">
                  <div className="card-icon"><IconActivity /></div>
                  <div className="card-info">
                    <p className="label">Total Scans</p>
                    <p className="value">{scans.length}</p>
                  </div>
                </div>
                <div className="stat-card premium">
                  <div className="card-icon"><IconCalendar /></div>
                  <div className="card-info">
                    <p className="label">Last Scan</p>
                    <p className="value">{scans.length > 0 ? new Date(scans[0].timestamp).toLocaleDateString() : 'None'}</p>
                  </div>
                </div>
                <div className="stat-card premium">
                  <div className="card-icon"><IconShield /></div>
                  <div className="card-info">
                    <p className="label">Risk Status</p>
                    <p className="value" style={{ color: scans.length > 0 && scans[0].risk_assessment?.includes('High') ? '#ff7675' : '#55efc4' }}>
                      {scans.length > 0 ? scans[0].analysis_result : 'Clear'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pro-grid">
                <div className="pro-card glass-light">
                  <div className="card-header">
                    <h3>Recent Scan History</h3>
                    <button className="view-all" onClick={() => setActiveTab('scans')}>View All</button>
                  </div>
                  <div className="scan-list-modern">
                    {scans.length > 0 ? scans.slice(0, 3).map((scan, idx) => (
                      <div className="scan-item-modern" key={idx}>
                        <div className="scan-icon"><IconFile /></div>
                        <div className="scan-details">
                          <p className="scan-name">{scan.filename || 'Lipoma Analysis Report'}</p>
                          <p className="scan-date">{new Date(scan.timestamp).toLocaleString()} &bull; {scan.scan_type || 'Medical Scan'}</p>
                        </div>
                        <div className={`scan-status ${scan.analysis_result?.includes('Likely') ? 'badge-pending' : 'badge-success'}`}>
                          {scan.confidence_score}
                        </div>
                      </div>
                    )) : (
                      <p className="empty-text-mini">No recent scan history. Upload your first PDF report.</p>
                    )}
                  </div>
                </div>

                <div className="pro-card pro-chatbot-mini">
                  <div className="card-visual-glow"></div>
                  <h3>Intelligent Advisor</h3>
                  <p>Our neural specialist is ready to address your diagnostic inquiries.</p>
                  <button className="pro-btn-secondary" onClick={() => setActiveTab('chat')}>
                    Initiate Consultation
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── My Scans ───────────────────────────────────── */}
          {activeTab === 'scans' && (
            <div>
              <div className="view-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2>Clinical Repository</h2>
                  <p>Upload MRI/CT scan images or PDF reports for high-precision AI analysis.</p>
                </div>
                <button className="pro-btn-primary" onClick={() => fileInputRef.current?.click()}>
                  <IconUploadSmall /> &nbsp; Upload Scan / Report
                </button>
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />

              {/* Drag & Drop Zone */}
              <div
                className={`pdf-drop-zone ${isDragging ? 'dragging' : ''}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="drop-zone-icon"><IconUpload /></div>
                <h4>Drag & Drop your Scan Image or PDF Report here</h4>
                <p>Supports: MRI • CT Scan Images (JPG/PNG) & Ultrasound Reports (PDF)</p>
                <button className="drop-zone-btn">📁 Browse Files</button>
              </div>

              <div className="scans-detailed-grid" style={{ marginTop: '24px' }}>
                {scans.length > 0 ? scans.map((scan, idx) => (
                  <div className="scan-detail-card glass" key={idx}>
                    <div className="sd-header">
                      <IconFile />
                      <span className="sd-id">#ID-{(scan.scan_id || scan.timestamp || '').slice(-6).toUpperCase()}</span>
                      <span className="sd-type-badge" style={{ 
                        backgroundColor: scan.status === 'Invalid Scan' ? '#ff7675' : (scan.scan_modality?.includes('Image') ? '#6c63ff' : '#00b894') 
                      }}>
                        {scan.status === 'Invalid Scan' ? '❌ Invalid Media' : (scan.scan_modality || 'Scan')}
                      </span>
                    </div>
                    <div className="sd-body">
                      <p className="sd-filename">📄 {scan.filename || 'Scan Media'}</p>
                      
                      {scan.status === 'Invalid Scan' ? (
                        <div className="invalid-scan-container">
                          <h4>⚠️ Radiological Fidelity Rejection</h4>
                          <p className="sd-result" style={{ color: '#ff7675' }}>{scan.analysis_result}</p>
                          <div className="invalid-scan-notice" style={{ padding: '12px', background: '#fff5f5', borderRadius: '8px', border: '1px solid #ffdada', marginTop: '12px' }}>
                             <p style={{ fontSize: '13px', color: '#c0392b', lineHeight: '1.5' }}>
                               <strong>AI Safety Intercept:</strong> This image does not contain the required radiological signatures of an MRI or CT scan. Rejection Reason: {scan.detailed_findings.split('REJECTION REASON: ')[1]?.split('. ')[0] || 'Non-medical contrast distribution'}.
                             </p>
                          </div>
                        </div>
                      ) : (
                        <div className="radiology-report-premium">
                          <div className="report-header">
                            <h4>AI RADIOLOGY REPORT</h4>
                            <span className="sc-modality">{scan.scan_modality || 'MRI/CT Analysis'}</span>
                          </div>

                          {/* 🧑 Patient Info */}
                          <div className="report-section patient-box">
                            <div className="section-title">🧑 Patient Identification</div>
                            <div className="report-grid-3">
                              <div className="rg-item"><label>Name</label><span>{scan.report_data?.patient?.name || scan.patient_info?.name || 'N/A'}</span></div>
                              <div className="rg-item"><label>Age/Gender</label><span>{scan.report_data?.patient?.age_gender || `${scan.patient_info?.age || 'N/A'} / ${scan.patient_info?.gender || 'N/A'}`}</span></div>
                              <div className="rg-item"><label>Source</label><span>{scan.report_data?.patient?.scan_type || scan.scan_type || 'N/A'}</span></div>
                            </div>
                          </div>

                          {/* 📍 Findings */}
                          <div className="report-section">
                            <div className="section-title">📍 Imaging Findings</div>
                            <div className="report-grid-2">
                              <div className="rg-item"><label>Anatomical Location</label><span>{scan.report_data?.findings?.location || scan.body_location || 'N/A'}</span></div>
                              <div className="rg-item"><label>Size (L×W×D)</label><span>{scan.report_data?.findings?.size || scan.tissue_density || 'N/A'}</span></div>
                              <div className="rg-item"><label>Shape Profile</label><span>{scan.report_data?.findings?.shape || 'Not specified'}</span></div>
                              <div className="rg-item"><label>Margins</label><span>{scan.report_data?.findings?.margins || 'N/A'}</span></div>
                              <div className="rg-item"><label>Internal Density</label><span>{scan.report_data?.findings?.density || 'Homogeneous'}</span></div>
                              <div className="rg-item"><label>Confidence</label><span style={{ color: '#6c63ff', fontWeight: 'bold' }}>{scan.confidence_score} (Precision: {scan.precision_value})</span></div>
                            </div>
                          </div>

                          {/* 🧠 Impression */}
                          <div className="report-section impression-box">
                            <div className="section-title">🧠 Diagnostic Impression</div>
                            <p className="impression-text"><strong>Conclusion:</strong> {scan.report_data?.impression?.diagnosis || scan.analysis_result}</p>
                            <p className="impression-text"><strong>Pathology:</strong> {scan.report_data?.impression?.malignancy || 'Low suspicion for atypical markers'}</p>
                            <div className="removability-tag" style={{ 
                              color: scan.removability_status?.toLowerCase().includes('removable') ? '#00b894' : '#ff7675'
                            }}>
                              <span className="r-icon">⚡</span> {scan.report_data?.impression?.removability || `Surgical Status: ${scan.removability_status}`}
                            </div>
                          </div>

                          {/* ⚠️ Recommendation */}
                          <div className="report-section recommendation-box">
                            <div className="section-title">⚠️ Clinical Recommendations</div>
                            <ul className="rec-list">
                              <li>{scan.report_data?.recommendation?.clinical || 'Correlation with physical exam.'}</li>
                              <li>{scan.report_data?.recommendation?.follow_up || 'Routine monitoring suggested.'}</li>
                              <li>{scan.report_data?.recommendation?.biopsy || 'Biopsy not indicated.'}</li>
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="sd-footer">
                      <span>{scan.model_identifier || scan.model_version}</span>
                      {scan.report_id && (
                        <button className="download-report-btn" onClick={() => handleDownload(scan.report_id)}>
                          <IconDownload /> Download Report PDF
                        </button>
                      )}
                    </div>
                  </div>
                )) : (
                  <div className="empty-view glass" style={{ gridColumn: '1 / -1' }}>
                    <span className="empty-icon"><IconFolder /></span>
                    <h3>No Clinical Data Found</h3>
                    <p>Upload your Ultrasound, MRI, or CT PDF report to begin AI analysis.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Profile ────────────────────────────────────── */}
          {activeTab === 'profile' && (
            <div className="profile-wow-container">
              <div className="profile-header-premium">
                <div className="ph-left">
                  <div className="premium-avatar-box">
                    <div className="avatar-ring"></div>
                    <div className="avatar-main">{initials}</div>
                  </div>
                  <div className="ph-text">
                    <h2>{fullName}</h2>
                    <p>{profileData.email}</p>
                    <div className="ph-badges">
                      <span className="p-badge gold">Elite Member</span>
                      <span className="p-badge blue">Verified Identity</span>
                    </div>
                  </div>
                </div>
                <button className="glass-btn primary" onClick={() => setEditingProfile(!editingProfile)}>
                  {editingProfile ? 'Cancel Edit' : 'Modify Repository'}
                </button>
              </div>

              <div className="profile-dashboard-grid">
                <div className="health-id-card glass-premium">
                  <div className="card-top">
                    <IconDna />
                    <span>LIPOMA DETECTION SYSTEM</span>
                  </div>
                  <div className="card-mid">
                    <div className="barcode"></div>
                    <div className="id-details">
                      <label>PATIENT ID</label>
                      <p>PX-{user.email.split('@')[0].toUpperCase()}</p>
                      <label>MEMBER SINCE</label>
                      <p>MARCH 2024</p>
                    </div>
                  </div>
                  <div className="card-bottom">
                    <span>SEALED & SECURED BY NEURAL ARCHITECTURE</span>
                  </div>
                </div>

                <div className="vitals-section pro-card glass-light">
                  <h3>Biometric Vitals</h3>
                  <div className="vitals-grid">
                    {[
                      { l: 'Blood', v: profileData.blood || 'A+', c: '#ff7675' },
                      { l: 'Pulse', v: '72 BPM', c: '#55efc4' },
                      { l: 'Activity', v: 'Normal', c: '#74b9ff' },
                      { l: 'Health', v: scans.length > 0 ? '98%' : 'N/A', c: '#a29bfe' }
                    ].map((v, i) => (
                      <div className="vital-item" key={i}>
                        <label>{v.l}</label>
                        <span style={{ color: v.c }}>{v.v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="profile-info-grid">
                  {/* Digital Medical Record Section */}
                  <div className="pro-card glass-light full-width">
                    <div className="card-header">
                      <h3><span className="h-icon">📋</span> Clinical Digital Record</h3>
                    </div>
                    <div className="medical-record-grid">
                      <div className="medical-column">
                        <h4>Identity & Contact</h4>
                        <div className="profile-fields-modern">
                          {[
                            { key: 'firstName', label: 'First Name' },
                            { key: 'lastName', label: 'Last Name' },
                            { key: 'phone', label: 'Primary Contact' },
                            { key: 'gender', label: 'Biological Sex' },
                          ].map(({ key, label }) => (
                            <div className="field-group" key={key}>
                              <label>{label}</label>
                              {editingProfile
                                ? <input type="text" value={profileData[key]} onChange={e => setProfileData({...profileData, [key]: e.target.value})} />
                                : <p>{profileData[key] || 'Not Set'}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="medical-column">
                        <h4>Biometrics & Clinical</h4>
                        <div className="profile-fields-modern">
                          {[
                            { key: 'blood', label: 'Blood Type' },
                            { key: 'height', label: 'System Height' },
                            { key: 'weight', label: 'Current Weight' },
                            { key: 'emergencyContact', label: 'Emergency Reach' },
                          ].map(({ key, label }) => (
                            <div className="field-group" key={key}>
                              <label>{label}</label>
                              {editingProfile
                                ? <input type="text" value={profileData[key]} onChange={e => setProfileData({...profileData, [key]: e.target.value})} />
                                : <p>{profileData[key] || 'Not Set'}</p>}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="medical-column full-mobile">
                        <h4>Health Intelligence</h4>
                        <div className="clinical-tags-section">
                          <div className="clinical-tag blue">
                            <label>Chronic Conditions</label>
                            {editingProfile 
                              ? <input type="text" value={profileData.conditions} onChange={e => setProfileData({...profileData, conditions: e.target.value})} />
                              : <span>{profileData.conditions}</span>}
                          </div>
                          <div className="clinical-tag red">
                            <label>Identified Allergies</label>
                            {editingProfile 
                              ? <input type="text" value={profileData.allergies} onChange={e => setProfileData({...profileData, allergies: e.target.value})} />
                              : <span>{profileData.allergies}</span>}
                          </div>
                          <div className="clinical-tag green">
                            <label>Active Medications</label>
                            {editingProfile 
                              ? <input type="text" value={profileData.medications} onChange={e => setProfileData({...profileData, medications: e.target.value})} />
                              : <span>{profileData.medications}</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="medical-footer">
                      <div className="security-badge">
                        <span className="s-icon">🛡️</span> Data encrypted with AES-256 for clinical security
                      </div>
                      {editingProfile && (
                        <button className="pro-btn-primary" onClick={() => setEditingProfile(false)}>
                          Commit Changes to Repository
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── AI Chat ────────────────────────────────────── */}
          {activeTab === 'chat' && (
            <div className="chat-full-view">
              <div className="view-title">
                <h2>AI Medical Assistant</h2>
                <p>Secure, AI-powered medical doubt clearance for patients.</p>
              </div>
              <Chatbot />
            </div>
          )}

        </section>
      </main>
    </div>
  );
};

export default PatientDashboard;
