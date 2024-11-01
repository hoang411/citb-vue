import axios from 'axios '
import { useAuthStore } from '@/stores/auth'

const api = axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
})

api.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore()
        if (authStore.token) {
            config.headers.Authorization = `Bearer ${authStore.token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const authStore = useAuthStore()
        const originalRequest = error.config

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                await authStore.refreshAccessToken()
                return api(originalRequest)
            } catch (refreshError) {
                authStore.logout()
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default api