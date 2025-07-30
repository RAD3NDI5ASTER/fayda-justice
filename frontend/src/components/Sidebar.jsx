import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar({ isLoggedIn, onLogout }) {
  const location = useLocation()

  const linkStyle = (path) => ({
    display: 'block',
    marginBottom: '1rem',
    color: location.pathname === path ? '#ffc107' : '#e2e8f0',
    fontWeight: location.pathname === path ? '700' : '500',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    backgroundColor: location.pathname === path ? '#0052cc' : 'transparent',
    textDecoration: 'none',
    cursor: 'pointer',
  })

  return (
    <div
      className="sidebar"
      style={{
        width: 250,
        backgroundColor: '#003366',
        color: 'white',
        borderRight: '1px solid #002244',
        height: '100vh',
        paddingTop: '2rem',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '1rem',
      }}
    >
      <nav>
        <Link to="/" style={linkStyle('/')}>
          Dashboard
        </Link>
        <Link to="/cases" style={linkStyle('/cases')}>
          Cases
        </Link>
        <Link to="/admin" style={linkStyle('/admin')}>
          Admin Panel
        </Link>

        {isLoggedIn ? (
          <button
            onClick={onLogout}
            style={{
              marginTop: 'auto',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#ffc107',
              color: '#003366',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" style={linkStyle('/login')}>
            Login
          </Link>
        )}
      </nav>
    </div>
  )
}
