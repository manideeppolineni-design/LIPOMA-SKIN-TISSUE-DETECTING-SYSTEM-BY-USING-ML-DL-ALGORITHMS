import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      
      if (response.ok) {
        const userData = await response.json()
        if (userData.role === 'admin') {
          onLogin(userData)
          navigate('/admin/dashboard')
        } else {
          alert("Access Denied: Administrative privileges required.")
        }
      } else {
        const error = await response.json()
        alert(error.detail || "Login failed")
      }
    } catch (err) {
      console.error("Login error:", err)
      alert("Server connection failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-auth-page">
      <div className="admin-login-card glass">
        <div className="admin-header">
          <div className="admin-badge">Secure Admin Portal</div>
          <h1>System Administration</h1>
          <p>Please enter your credentials to access the management console.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="modern-form">
          <div className="input-group">
            <label>Admin Email</label>
            <input 
              type="email" 
              placeholder="admin@lipomadetect.ai" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <label>Security Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="submit-btn admin-btn" disabled={loading}>
            {loading ? 'Authenticating...' : 'Access Console'}
          </button>
        </form>
        
        <div className="admin-footer">
          <p>Unauthorized access is strictly prohibited and monitored.</p>
          <Link to="/" className="back-link">Return to Public Site</Link>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
