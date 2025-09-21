import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { fetchDashboard } from '../api'
import SegmentToggle from './SegmentToggle'
import Box from './Box'

const DEFAULT_GUEST_DASH = {
//   spending: { name: 'Spending', value: 0.0 },
//   classifications: [],
//   options: ['Monthly', 'Weekly'],
//   selectedOption: 'Monthly'
    spending: { name: 'Spending', value: 1000.0 },
    classifications: [
        { name: 'Food', value: 50.0 },
        { name: 'Transport', value: 100.0 },
        { name: 'Entertainment', value: 0.0 }
    ],
    options: ['Monthly', 'Weekly'],
    selectedOption: 'Monthly'
}

export default function Dashboard() {
  const { token, user, logout } = useContext(AuthContext)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    async function load() {
      setLoading(true)
      setError(null)
      try {
        let res
        if (user?.guest) {
          res = DEFAULT_GUEST_DASH
        } else {
          res = await fetchDashboard(token)
        }
        if (!isMounted) return
        setData(res)
        setSelected(res.selectedOption || (res.options && res.options[0]))
      } catch (err) {
        if (!isMounted) return
        setError(err?.message || 'Failed to load dashboard')
      } finally {
        if (isMounted) setLoading(false)
      }
    }
    load()
    return () => {
      isMounted = false
    }
  }, [token, user])

  if (loading) return <div className="app-wrap"><div className="loading">Loading dashboard…</div></div>
  if (error) return <div className="app-wrap"><div className="error">{error}</div></div>

  const { spending, classifications = [], options = [] } = data || {}

  return (
    <div className="app-wrap">
      <header className="app-header">
        <h1>Expense-Insights</h1>
        <div className="header-right">
          <div className="welcome">Welcome, {user?.name ?? user?.username ?? 'User'}</div>
          <button className="btn small" onClick={logout}>Logout</button>
        </div>
      </header>

      <main className="dashboard">
        {/* Main spending box */}
        <div className="spending-row">
          <Box title={spending?.name ?? 'Spending'} value={spending?.value ?? 0} />
        </div>

        {/* segmented control */}
        <div className="seg-toggle-row">
          <SegmentToggle options={options} selected={selected} onChange={setSelected} />
        </div>

        {/* big container with classification boxes — only show when available */}
        <div className="big-container">
          {classifications && classifications.length > 0 ? (
            <div className="grid">
              {classifications.map((c) => (
                <div key={c.name} className="grid-item">
                  <Box title={c.name} value={c.value} />
                </div>
              ))}
            </div>
          ) : (
            <div className="info">No classifications available — showing default spending only.</div>
          )}
        </div>
      </main>
    </div>
  )
}
