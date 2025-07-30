import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Fingerprint, KeyRound, Globe } from 'lucide-react' // Added Globe icon for OAuth button
import '../index.css'
import Sidebar from '../components/Sidebar'

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState(null)
  const [loginMode, setLoginMode] = useState('oauth') // 'oauth' | 'otp' | 'biometric'

  // Redirect user to backend OAuth login endpoint
  const handleOAuthLogin = () => {
    // Clear errors
    setError(null)
    // Redirect browser to backend login endpoint
    window.location.href = '/login' // Your Go backend /login route triggers OAuth redirect
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError(null)

    if (loginMode === 'otp') {
      // Local OTP simulation (optional)
      if (email.toLowerCase() === 'user@example.com' && otp === '123456') {
        onLogin()
      } else {
        setError('Invalid email or OTP.')
      }
    } else if (loginMode === 'biometric') {
      const confirmed = window.confirm('Simulate biometric login?')
      if (confirmed) {
        onLogin()
      } else {
        setError('Biometric authentication failed.')
      }
    }
  }

  return (
    <div className="login-page">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="login-card"
        role="main"
        aria-label="Login form"
      >
        <h2 className="login-title">FaydaJustice Login</h2>

        <div className="login-options" role="tablist" aria-label="Select login method">
          <button
            type="button"
            role="tab"
            aria-selected={loginMode === 'oauth'}
            className={`login-option-button ${loginMode === 'oauth' ? 'active' : ''}`}
            onClick={() => setLoginMode('oauth')}
            aria-controls="oauth-panel"
            id="oauth-tab"
          >
            <Globe className="icon" />
            OAuth Login
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={loginMode === 'otp'}
            className={`login-option-button ${loginMode === 'otp' ? 'active' : ''}`}
            onClick={() => setLoginMode('otp')}
            aria-controls="otp-panel"
            id="otp-tab"
          >
            <KeyRound className="icon" />
            OTP
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={loginMode === 'biometric'}
            className={`login-option-button ${loginMode === 'biometric' ? 'active' : ''}`}
            onClick={() => setLoginMode('biometric')}
            aria-controls="biometric-panel"
            id="biometric-tab"
          >
            <Fingerprint className="icon" />
            Biometric
          </button>
        </div>

        {loginMode === 'oauth' ? (
          <div
            id="oauth-panel"
            role="tabpanel"
            aria-labelledby="oauth-tab"
            style={{ marginTop: '1.5rem', textAlign: 'center' }}
          >
            <button
              type="button"
              onClick={handleOAuthLogin}
              className="login-submit-button"
            >
              Login with OAuth
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="login-form" noValidate>
            {loginMode === 'otp' && (
              <div
                id="otp-panel"
                role="tabpanel"
                aria-labelledby="otp-tab"
              >
                <label htmlFor="email" className="login-label">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="login-input"
                  autoComplete="username"
                  autoFocus
                />

                <label htmlFor="otp" className="login-label">OTP</label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="login-input"
                  maxLength={6}
                  inputMode="numeric"
                  pattern="\d{6}"
                />
              </div>
            )}

            {loginMode === 'biometric' && (
              <div
                id="biometric-panel"
                role="tabpanel"
                aria-labelledby="biometric-tab"
                style={{ marginBottom: '1rem' }}
              >
                <p>Click submit to simulate biometric login.</p>
              </div>
            )}

            {error && <p className="login-error" role="alert">{error}</p>}

            <button type="submit" className="login-submit-button" aria-live="polite">
              {loginMode === 'otp' ? 'Login with OTP' : 'Login with Biometric'}
            </button>
          </form>
        )}
      </motion.div>
    </div>
  )
}

export default Login
