// src/interfaces/user.interface.ts
export interface User {
    id: number
    email: string
    phoneNumber: string
    address: string
    dateOfBirth: Date
    fullName: string
    avatar?: string
    role: 'ADMIN' | 'USER' | 'WAREHOUSE' | 'SALES'
    active: boolean
}

// src/interfaces/auth.interface.ts
export interface LoginRequest {
    phoneNumber: string
    password: string
}

export interface LoginResponse {
    token: string
    user: User
}