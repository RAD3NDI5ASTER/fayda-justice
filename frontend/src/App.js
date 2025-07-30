import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Sidebar from './components/Sidebar'

import DashboardPage from './pages/Dashboard'
import CasesPage from './pages/Cases'
import AdminPage from './pages/Admin'

export default function App() {
  return (
    <Router>
      <div className="app-layout" style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header />
          <main style={{ flex: 1, padding: '1rem', backgroundColor: '#f5f6fa' }}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/cases" element={<CasesPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}
