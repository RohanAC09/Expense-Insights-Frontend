import axios from 'axios'

const BACKEND = import.meta.env.VITE_BACKEND_URL || ''

export async function loginAPI(username, password) {
  if (!BACKEND) {
    // mock login: username=user password=pass (for demo)
    await wait(500)
    if (username === 'Rohan' && password === 'pass') {
      return { token: 'mock-token', user: { username: 'Rohan', name: 'Rohan' } }
    }
    throw new Error('Invalid credentials (demo: use Rohan / pass)')
  }

  const res = await axios.post(`${BACKEND}/login`, { username, password })
  return res.data
}

export async function fetchDashboard(token) {
  if (!BACKEND) {
    // mock dashboard data
    await wait(400)
    return {
      spending: { name: 'Spending', value: 16087.56 },
      classifications: [
        { name: 'Food', value: 4500.0 },
        { name: 'Transport', value: 3000.0 },
        { name: 'Entertainment', value: 1100.0 }
      ],
      options: ['Monthly', 'Weekly'],
      selectedOption: 'Monthly'
    }
  }

  const res = await axios.get(`${BACKEND}/dashboard`, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms))
}
