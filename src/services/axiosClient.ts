import axios from 'axios'
import { productConfig } from '../config/productConfig'

export const axiosClient = axios.create({
  baseURL: productConfig.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message ?? error.message
    return Promise.reject(new Error(message))
  },
)

