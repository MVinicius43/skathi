import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://api.remove.bg/v1.0',
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': import.meta.env.VITE_REMOVE_BG_API_Key,
  },
  responseType: 'arraybuffer',
})
