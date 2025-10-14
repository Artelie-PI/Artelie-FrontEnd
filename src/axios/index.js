// src/axios/index.js
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:19003/',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Envia token automaticamente se existir
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient
