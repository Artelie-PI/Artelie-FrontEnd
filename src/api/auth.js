import apiClient from '@/axios'

export async function login(email, password) {
  const { data } = await apiClient.post('/api/token/', { email, password })
  localStorage.setItem('access_token', data.access)
  localStorage.setItem('refresh_token', data.refresh)
  return data
}

export async function register(userData) {
  const { data } = await apiClient.post('/api/register/', userData)
  return data
}

export function logout() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}
