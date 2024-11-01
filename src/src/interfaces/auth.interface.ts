export interface RegisterRequest {
    full_name: string
    email: string
    phone_number: string
    password: string
    address: string
    date_of_birth?: string
}

export interface LoginRequest {
    phone_number: string
    password: string
}

export interface LoginResponse {
    statusCode: number
    message: string
    data: {
        token: string
        user: UserProfile
    }
}

export interface UserProfile {
    id: number
    full_name: string
    phone_number: string
    email: string
    address: string
    date_of_birth?: string
    avatar?: string
    role?: string
}