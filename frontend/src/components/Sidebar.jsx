import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {
  const location = useLocation()

  const linkStyle = (path) => ({
    display: 'block',
    marginBottom: '1rem',
    color: location.pathname === path ? '#0056b3' : '#222',
    fontWeight: location.pathname === path ? '700' : '500',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    backgroundColor: location.pathname === path ? '#e6f0ff' : 'transparent',
    textDecoration: 'none',
  })

  return (
    <div
      className="sidebar"
      style={{
        width: 250,
        backgroundColor: 'white',
        borderRight: '1px solid #ddd',
        height: '100vh',
        padding: '1rem',
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
      </nav>
    </div>
  )
}
