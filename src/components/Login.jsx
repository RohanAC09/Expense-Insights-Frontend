import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { loginAPI } from '../api'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { login, guestLogin } = useContext(AuthContext)
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await loginAPI(username.trim(), password)
      // expected res: { token, user }
      login({ token: res.token, user: res.user })
      navigate('/', { replace: true })
    } catch (err) {
      setError(err?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const proceedGuest = () => {
    const guestUser = { username: 'guest', name: 'Guest User', guest: true }
    guestLogin(guestUser)
    navigate('/', { replace: true })
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-left">
          <div className="avatar">👤</div>
          <h2>User Login</h2>

          <form onSubmit={onSubmit} className="login-form">
            <label className="sr-only">Username</label>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              required
            />
            <label className="sr-only">Password</label>
            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
            />

            <div className="forgot">Forgot Password?</div>

            {error && <div className="error">{error}</div>}

            <button className="btn login-btn" type="submit" disabled={loading}>
              {loading ? 'Logging…' : 'Login'}
            </button>
          </form>
        </div>

        <div className="or-section">
          <div className="or-circle">OR</div>
        </div>

        <div className="login-right">
          <div className="guest-card">
            <div className="guest-text">Proceed as Guest</div>
            <button className="btn guest-btn" onClick={proceedGuest}>
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
