import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom'

import Header from './components/Header'
import Sidebar from './components/Sidebar'

import DashboardPage from './pages/Dashboard'
import CasesPage from './pages/Cases'
import AdminPage from './pages/Admin'
import Login from './pages/Login'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true) // Loading state during auth check

  useEffect(() => {
    // On mount, check if user is logged in by calling backend /me endpoint
    async function checkAuth() {
      try {
        const response = await fetch('/me', {
          credentials: 'include', // send cookies for session
        })
        if (response.ok) {
          setIsLoggedIn(true)
        } else {
          setIsLoggedIn(false)
        }
      } catch (error) {
        setIsLoggedIn(false)
      } finally {
        setLoading(false)
      }
    }
    checkAuth()
  }, [])

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  const handleLogout = async () => {
    // Call backend logout endpoint to clear session
    await fetch('/logout', { method: 'POST', credentials: 'include' })
    setIsLoggedIn(false)
  }

  if (loading) {
    // You can return a spinner or loading screen here
    return <div>Loading...</div>
  }

  return (
    <Router>
      <Routes>
        {/* Public route: Login */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Protected routes */}
        {isLoggedIn ? (
          <Route
            path="/*"
            element={
              <div className="app-layout" style={{ display: 'flex', height: '100vh' }}>
                <Sidebar />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Header onLogout={handleLogout} />
                  <main style={{ flex: 1, padding: '1rem', backgroundColor: '#f5f6fa' }}>
                    <Routes>
                      <Route path="/" element={<DashboardPage />} />
                      <Route path="/cases" element={<CasesPage />} />
                      <Route path="/admin" element={<AdminPage />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                </div>
              </div>
            }
          />
        ) : (
          // Redirect all other paths to /login if not logged in
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  )
}

export default App
