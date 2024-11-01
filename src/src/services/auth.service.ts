import api from './api'

export const authService = {
    async login(credentials) {
        const response = await api.post('/auth/login', credentials)
        return response.data
    },
    async register(userData) {
        const response = await api.post('/auth/register', userData)
        return response.data
    },
    async getUserProfile() {
        const response = await api.get('/users/profile')
        return response.data
    }
}