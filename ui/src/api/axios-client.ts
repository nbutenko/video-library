import axios, { AxiosInstance } from 'axios'

export const httpClient: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/'
})