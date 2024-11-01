import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/auth.service'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null)
    const token = ref(localStorage.getItem('token'))

    const isAuthenticated = computed(() => !!token.value)
    const isAdmin = computed(() => user.value?.role === 'ADMIN')

    async function login(credentials) {
        const response = await authService.login(credentials)
        token.value = response.token
        user.value = response.user
        localStorage.setItem('token', response.token)
    }

    function logout() {
        token.value = null
        user.value = null
        localStorage.removeItem('token')
    }

    return { user, isAuthenticated, isAdmin, login, logout }
})