import { Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import PatientDashboard from './components/PatientDashboard'
import AdminDashboard from './components/AdminDashboard'
import AdminLogin from './components/AdminLogin'

const Home = () => (
  <div className="hero-section">
    <div className="hero-glow"></div>
    <div className="container">
      <div className="hero-content">
        <span className="badge-premium">Next-Gen Diagnostics</span>
        <h1>AI-Powered <br/><span>Lipoma Detection</span></h1>
        <p>Harnessing elite deep learning for secure, fast, and clinically-grade analysis of medical scans. Empowering healthcare with instant clarity.</p>
        <div className="hero-btns">
          <Link to="/signup" className="pro-btn-primary">Start Analysis</Link>
          <Link to="/how-it-works" className="pro-btn-secondary" style={{ marginLeft: '16px' }}>Learn More</Link>
        </div>
      </div>
    </div>
  </div>
)

const About = () => (
  <div className="page-section section-padding">
    <div className="container">
      <div className="section-header-pro">
        <span className="section-subtitle">Our Mission</span>
        <h2 className="section-title">Redefining Precision in Healthcare</h2>
      </div>
      <div className="about-grid">
        <div className="about-text">
          <p>Lipoma Detection is at the intersection of medical expertise and artificial intelligence. We believe that early and accurate detection should be accessible to everyone, anywhere in the world.</p>
          <p>Our specialized AI engine is trained on thousands of confirmed cases to differentiate benign lipomas from complex tissue structures with unprecedented accuracy.</p>
        </div>
        <div className="about-features">
          <div className="feature-mini-card">
            <span className="mini-icon">🛡️</span>
            <div>
              <h4>Privacy First</h4>
              <p>HIPAA compliant data processing.</p>
            </div>
          </div>
          <div className="feature-mini-card">
            <span className="mini-icon">🏎️</span>
            <div>
              <h4>Instant Results</h4>
              <p>Analysis completed in seconds.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const HowItWorks = () => (
  <div className="page-section bg-alt section-padding">
    <div className="container">
      <div className="section-header-pro">
        <span className="section-subtitle">The Process</span>
        <h2 className="section-title">Seamless Diagnostic Workflow</h2>
      </div>
      <div className="workflow-steps">
        <div className="step-card">
          <span className="step-num">01</span>
          <h3>Upload Scan</h3>
          <p>Securely upload your MRI, CT, or Ultrasound images in standard DICOM or JPG formats.</p>
        </div>
        <div className="step-card">
          <span className="step-num">02</span>
          <h3>AI Analysis</h3>
          <p>Our neural networks process the visual data, identifying anomalies and potential lipoma structures.</p>
        </div>
        <div className="step-card">
          <span className="step-num">03</span>
          <h3>Clinical Report</h3>
          <p>Receive an instantly generated, data-rich report including risk assessment and confidence scores.</p>
        </div>
      </div>
    </div>
  </div>
)

const Contact = () => (
  <div className="container" style={{ padding: '80px 0' }}>
    <div className="section-header-pro">
      <span className="section-subtitle">Get in Touch</span>
      <h2 className="section-title">Contact Us</h2>
    </div>
    <div className="contact-card glass" style={{ maxWidth: '800px', margin: '0 auto', padding: '40px', borderRadius: '24px', textAlign: 'left' }}>
      
      <h3 style={{ marginBottom: '32px', color: 'var(--text-main)', fontSize: '1.5rem', fontWeight: '600', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
        Executive Team
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {/* Manideep */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ background: 'var(--bg-card)', padding: '12px', borderRadius: '12px', fontSize: '1.25rem' }}>👤</div>
          <div>
            <h4 style={{ margin: '0 0 4px 0', color: 'var(--text-main)', fontSize: '1.1rem' }}>Manideep Polineni</h4>
            <p style={{ margin: '0 0 6px 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Founder</p>
            <a href="mailto:99230040882@klu.ac.in" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontSize: '0.9rem', wordBreak: 'break-all' }}>99230040882@klu.ac.in</a>
          </div>
        </div>

        {/* D. Harikrishna */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ background: 'var(--bg-card)', padding: '12px', borderRadius: '12px', fontSize: '1.25rem' }}>👤</div>
          <div>
            <h4 style={{ margin: '0 0 4px 0', color: 'var(--text-main)', fontSize: '1.1rem' }}>D. Harikrishna</h4>
            <p style={{ margin: '0 0 6px 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Co-Founder</p>
            <a href="mailto:99230040416@klu.ac.in" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontSize: '0.9rem', wordBreak: 'break-all' }}>99230040416@klu.ac.in</a>
          </div>
        </div>

        {/* S. Hemanth */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ background: 'var(--bg-card)', padding: '12px', borderRadius: '12px', fontSize: '1.25rem' }}>👤</div>
          <div>
            <h4 style={{ margin: '0 0 4px 0', color: 'var(--text-main)', fontSize: '1.1rem' }}>S. Hemanth</h4>
            <p style={{ margin: '0 0 6px 0', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Co-Founder</p>
            <a href="mailto:99230041268@klu.ac.in" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontSize: '0.9rem', wordBreak: 'break-all' }}>99230041268@klu.ac.in</a>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: '32px', color: 'var(--text-main)', fontSize: '1.5rem', fontWeight: '600', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
        Headquarters & Direct Line
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{ background: 'var(--bg-card)', padding: '12px', borderRadius: '12px', fontSize: '1.25rem' }}>📞</div>
          <div>
            <h4 style={{ margin: '0 0 6px 0', color: 'var(--text-main)', fontSize: '1.1rem' }}>Direct Line</h4>
            <p style={{ margin: '0', color: '#b2bec3' }}>
              <a href="tel:+919110772026" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: '500' }}>+91 9110772026</a>
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{ background: 'var(--bg-card)', padding: '12px', borderRadius: '12px', fontSize: '1.25rem' }}>🏫</div>
          <div>
            <h4 style={{ margin: '0 0 6px 0', color: 'var(--text-main)', fontSize: '1.1rem' }}>Headquarters</h4>
            <p style={{ margin: '0', color: '#b2bec3', lineHeight: '1.6' }}>
              Kalasalingam Academy of Research and Education<br/>
              Krishnankoil, Srivilliputhur<br/>
              Tamil Nadu, India
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
)

const PrivacyPolicy = () => (
  <div className="container" style={{ padding: '80px 0' }}>
    <div className="section-header-pro">
      <span className="section-subtitle">Legal</span>
      <h2 className="section-title">Privacy Policy</h2>
    </div>
    <p>Your medical data is encrypted and handled with the highest level of security in compliance with healthcare regulations.</p>
  </div>
)

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleResetPassword = (e) => {
    e.preventDefault();
    alert(`A professional password reset link has been dispatched to ${resetEmail}. Please check your inbox within 5 minutes.`);
    setShowResetModal(false);
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const decoded = await res.json();
        onLogin({ 
          email: decoded.email, 
          first_name: decoded.given_name || decoded.name.split(' ')[0], 
          last_name: decoded.family_name || decoded.name.split(' ').slice(1).join(' '),
          picture: decoded.picture,
          role: 'patient' 
        });
      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    },
    onError: () => {
      alert("Google Login Failed. Please try again.");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.toLowerCase().endsWith("@gmail.com")) {
      alert("Please use a valid @gmail.com address.");
      return;
    }
    if (email && password) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/login`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Bypass-Tunnel-Reminder': 'true'
          },
          body: JSON.stringify({ email, password })
        });
        if (response.ok) {
          const userData = await response.json();
          onLogin(userData);
        } else {
          const error = await response.json();
          alert(error.detail || "Login failed");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("Server connection failed");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-visual">
        <div className="visual-overlay"></div>
        <div className="visual-content">
          <h1>Digital Health <br/><span>Reimagined</span></h1>
          <p>Harnessing AI to provide faster, more accurate diagnostics for everyone, everywhere.</p>
        </div>
      </div>
      <div className="auth-form-section">
        <div className="form-card glass">
          <div className="brand-header">
            <Link to="/" className="back-btn" title="Back to Home">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </Link>
            <span className="brand-emoji">🧬</span>
            <h2>Welcome Back</h2>
          </div>
          <p className="form-subtitle">Choose your portal and enter your credentials</p>
          
          <form onSubmit={handleSubmit} className="modern-form">
            <div className="input-group">
              <label>Email ID</label>
              <input 
                type="email" 
                placeholder="name@gmail.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="input-group">
              <div className="label-row">
                <label>Password</label>
                <button type="button" className="forgot-link-btn" onClick={() => setShowResetModal(true)}>Forgot?</button>
              </div>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="submit-btn pro-btn-primary">Professional Sign In</button>
          </form>

          {showResetModal && (
            <div className="modal-overlay">
              <div className="modal-card glass-premium">
                <h3>Security Reset</h3>
                <p>Enter your registered @gmail.com to receive a secure access token.</p>
                <form onSubmit={handleResetPassword}>
                  <div className="input-group">
                    <input 
                      type="email" 
                      placeholder="name@gmail.com" 
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="modal-btns">
                    <button type="button" className="pro-btn-secondary" onClick={() => setShowResetModal(false)}>Cancel</button>
                    <button type="submit" className="pro-btn-primary">Send Token</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="social-divider">
            <span>or sign in with</span>
          </div>

          <div className="provider-grid">
            <button 
              className="provider-btn google-btn"
              onClick={() => login()}
              type="button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
              Google
            </button>
          </div>

          <p className="signup-prompt">
            Don't have an account? <Link to="/signup">Register now</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

const Signup = ({ onLogin }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const decoded = await res.json();
        onLogin({ 
          email: decoded.email, 
          first_name: decoded.given_name || decoded.name.split(' ')[0], 
          last_name: decoded.family_name || decoded.name.split(' ').slice(1).join(' '),
          picture: decoded.picture,
          role: 'patient' 
        });
      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.toLowerCase().endsWith("@gmail.com")) {
      alert("Registration is restricted to corporate-grade @gmail.com addresses.");
      return;
    }
    if (firstName && lastName && email && password) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/register`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Bypass-Tunnel-Reminder': 'true'
          },
          body: JSON.stringify({ 
            first_name: firstName, 
            last_name: lastName, 
            email, 
            password, 
            role: 'patient' 
          })
        });
        if (response.ok) {
          const userData = await response.json();
          alert("Registration successful!");
          onLogin(userData);
        } else {
          const error = await response.json();
          alert(error.detail || "Registration failed");
        }
      } catch (err) {
        console.error("Signup error:", err);
        alert("Server connection failed");
      }
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-visual">
        <div className="visual-overlay"></div>
        <div className="visual-content">
          <h1>Digital Health <br/><span>Reimagined</span></h1>
          <p>Harnessing AI to provide faster, more accurate diagnostics for everyone, everywhere.</p>
        </div>
      </div>
      <div className="auth-form-section">
        <div className="form-card glass">
          <div className="brand-header">
            <Link to="/" className="back-btn" title="Back to Home">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            </Link>
            <span className="brand-emoji">🧬</span>
            <h2>Create Account</h2>
          </div>
          <p className="form-subtitle">Join the future of medical diagnostics</p>
          
          <form onSubmit={handleSubmit} className="modern-form">
            <div className="input-row">
              <div className="input-group">
                <label>First Name</label>
                <input 
                  type="text" 
                  placeholder="First name" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required 
                />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <input 
                  type="text" 
                  placeholder="Last name" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required 
                />
              </div>
            </div>
            <div className="input-group">
              <label>Work Email (Gmail)</label>
              <input 
                type="email" 
                placeholder="name@gmail.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Security Password</label>
              <input 
                type="password" 
                placeholder="Min. 8 characters" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="submit-btn">Create Account</button>
          </form>

          <div className="social-divider">
            <span>or sign up with</span>
          </div>

          <div className="provider-grid">
            <button 
              className="provider-btn google-btn"
              onClick={() => login()}
              type="button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
              Google
            </button>
          </div>

          <p className="signup-prompt">
            Already registered? <Link to="/login">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

const Navbar = ({ user, onLogout }) => (
  <nav className="navbar-premium sticky-nav">
    <div className="container nav-flex">
      <Link to="/" className="brand-logo">
        <span className="logo-icon">🧬</span>
        <span className="logo-text">Lipoma<span>Detection</span></span>
      </Link>
      <div className="nav-menu">
        <Link to="/" className="menu-item">Home</Link>
        <Link to="/about" className="menu-item">About</Link>
        <Link to="/how-it-works" className="menu-item">How it Works</Link>
        <div className="nav-actions">
          {user ? (
            <>
              {user.role === 'admin' ? (
                <Link to="/admin/dashboard" className="menu-item dashboard-link">Admin Panel</Link>
              ) : (
                <Link to="/patient/dashboard" className="menu-item dashboard-link">Dashboard</Link>
              )}
              <button onClick={onLogout} className="pro-btn-secondary small">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="menu-item login-link">Login</Link>
              <Link to="/signup" className="pro-btn-primary small">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </div>
  </nav>
)

const Footer = () => (
  <footer>
    <div className="container">
      <div className="footer-grid">
        <div className="footer-company">
          <div className="footer-logo logo" style={{ color: 'white' }}>
            <span style={{ fontSize: '1.5rem' }}>🧬</span> Lipoma Detection
          </div>
          <p style={{ color: '#b2bec3', maxWidth: '300px' }}>
            Advancing medical diagnostics through artificial intelligence.
          </p>
        </div>
        <div className="footer-links">
          <h4>Platform</h4>
          <ul>
            <li><Link to="/how-it-works">How it Works</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 Lipoma Detection AI. All rights reserved.
      </div>
    </div>
  </footer>
)

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleLogin = (userData) => {
    setUser(userData);
    if (userData.role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/patient/dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/admin-priv-login';

  return (
    <div className="app">
      {!isAuthPage && <Navbar user={user} onLogout={handleLogout} />}
      <main className={!isAuthPage ? 'pt-navbar' : ''}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/patient/dashboard" /> : <Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/signup" 
            element={user ? <Navigate to="/patient/dashboard" /> : <Signup onLogin={handleLogin} />} 
          />
          <Route 
            path="/admin-priv-login" 
            element={user?.role === 'admin' ? <Navigate to="/admin/dashboard" /> : <AdminLogin onLogin={handleLogin} />} 
          />
          
          <Route 
            path="/patient/dashboard" 
            element={user ? <PatientDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin/dashboard" 
            element={user?.role === 'admin' ? <AdminDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/admin-priv-login" />} 
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
