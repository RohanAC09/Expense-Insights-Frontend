import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')

    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [token, user])

  const login = ({ token, user }) => {
    setToken(token)
    setUser(user)
  }
  const logout = () => {
    setToken(null)
    setUser(null)
  }
  const guestLogin = (guestUser) => {
    setToken('guest-token') // demo token
    setUser(guestUser)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout, guestLogin }}>
      {children}
    </AuthContext.Provider>
  )
}
