import React from 'react'

const mockCases = [
  { id: 'C-001', region: 'Addis Ababa', status: 'Pending', type: 'Civil' },
  { id: 'C-002', region: 'Oromia', status: 'Resolved', type: 'Criminal' },
  { id: 'C-003', region: 'Amhara', status: 'Pending', type: 'Criminal' },
]

export default function Dashboard() {
  const total = mockCases.length
  const pending = mockCases.filter(c => c.status === 'Pending').length
  const resolved = mockCases.filter(c => c.status === 'Resolved').length

  return (
    <div>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Dashboard Overview</h2>

      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '6px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            flex: 1,
          }}
        >
          <h3>Total Cases</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{total}</p>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '6px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            flex: 1,
          }}
        >
          <h3>Pending</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{pending}</p>
        </div>

        <div
          style={{
            backgroundColor: 'white',
            padding: '1rem',
            borderRadius: '6px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            flex: 1,
          }}
        >
          <h3>Resolved</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{resolved}</p>
        </div>
      </div>

      <h3 style={{ marginBottom: '0.5rem' }}>Case List</h3>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0', color: '#333' }}>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Case ID</th>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Region</th>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Type</th>
            <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {mockCases.map(c => (
            <tr key={c.id} style={{ borderTop: '1px solid #ddd' }}>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{c.id}</td>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{c.region}</td>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{c.type}</td>
              <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                <span
                  style={{
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    backgroundColor: c.status === 'Pending' ? '#fff3cd' : '#d4edda',
                    color: c.status === 'Pending' ? '#856404' : '#155724',
                  }}
                >
                  {c.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
