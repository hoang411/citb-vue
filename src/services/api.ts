import axios from 'axios'

const api = axios.create({
    baseURL: '/api/v1',  // Thay đổi prefix theo backend
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
})

// Add request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        console.log('Request:', {
            url: config.url,
            method: config.method,
            data: config.data,
            headers: config.headers
        })
        return config
    },
    (error) => {
        console.error('Request Error:', error)
        return Promise.reject(error)
    }
)

// Add response interceptor
api.interceptors.response.use(
    (response) => {
        console.log('Response:', response.data)
        return response
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        console.error('Response Error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        })
        return Promise.reject(error)
    }
)

export default api