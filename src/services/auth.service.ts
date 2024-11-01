import api from './api'
import type { LoginRequest, LoginResponse, RegisterRequest } from '@/interfaces/auth.interface'

export const authService = {
    async login(data: LoginRequest): Promise<LoginResponse> {
        const response = await api.post<LoginResponse>('/users/login', {
            phone_number: data.phone_number,
            password: data.password
        })
        if (response.data.data?.token) {
            localStorage.setItem('token', response.data.data.token)
        }
        return response.data
    },

    async register(data: RegisterRequest): Promise<void> {
        const formData = {
            full_name: data.full_name.trim(),
            email: data.email.trim(),
            phone_number: data.phone_number.trim(),
            password: data.password,
            address: data.address.trim(),
            date_of_birth: data.date_of_birth || null
        }
        await api.post('/users/register', formData)
    },

    async getUserProfile() {
        const response = await api.get('/users/details')
        return response.data
    },

    async updateProfile(data: Partial<RegisterRequest>) {
        const response = await api.put('/users/details', data)
        return response.data
    },

    async uploadAvatar(file: File) {
        const formData = new FormData()
        formData.append('file', file)
        const response = await api.post('/users/uploads', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    }
}