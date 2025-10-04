// src/api/auth.js
import apiClient from '@/axios'

// Login
export async function login(username, password) {
  const { data } = await apiClient.post('/token/', { username, password })
  localStorage.setItem('access_token', data.access)
  localStorage.setItem('refresh_token', data.refresh)
  return data
}

// Registro
export async function register(userData) {
  const { data } = await apiClient.post('/register/', userData)
  return data
}

// Logout
export function logout() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}
