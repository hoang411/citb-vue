import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authService } from '@/services/auth.service'
import type { LoginResponse } from '@/interfaces/auth.interface'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<LoginResponse['data']['user'] | null>(null)
    const token = ref<string | null>(null)

    const login = async (phone_number: string, password: string) => {
        try {
            const response = await authService.login({ phone_number, password })
            if (response.data) {
                user.value = response.data.user
                token.value = response.data.token
                localStorage.setItem('token', response.data.token)
            }
            return response
        } catch (error) {
            console.error('Login error:', error)
            throw error
        }
    }

    const logout = () => {
        user.value = null
        token.value = null
        localStorage.removeItem('token')
    }

    return {
        user,
        token,
        login,
        logout
    }
})