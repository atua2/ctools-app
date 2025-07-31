// utils/apiClient.ts
import axios from 'axios'

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  // you can add default headers here if needed:
  // headers: { 'Content-Type': 'application/json' }
})

export default API
