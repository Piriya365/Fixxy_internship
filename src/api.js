import { auth } from './firebase'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

async function getHeaders() {
  const headers = {
    'Content-Type': 'application/json'
  }
  const user = auth.currentUser
  if (user) {
    const token = await user.getIdToken()
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

export const api = {
  async get(endpoint) {
    const headers = await getHeaders()
    const res = await fetch(`${API_BASE}${endpoint}`, { method: 'GET', headers })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error || `API GET Error: ${res.statusText}`)
    }
    return res.json()
  },
  async post(endpoint, data) {
    const headers = await getHeaders()
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error || `API POST Error: ${res.statusText}`)
    }
    return res.json()
  },
  async put(endpoint, data) {
    const headers = await getHeaders()
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data)
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error || `API PUT Error: ${res.statusText}`)
    }
    return res.json()
  },
  async delete(endpoint) {
    const headers = await getHeaders()
    const res = await fetch(`${API_BASE}${endpoint}`, { method: 'DELETE', headers })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error || `API DELETE Error: ${res.statusText}`)
    }
    return res.json()
  }
}
export default api
