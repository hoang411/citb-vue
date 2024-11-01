export interface PaginationParams {
    page: number
    size: number
    sort?: string
}

export interface PaginationResponse<T> {
    content: T[]
    totalElements: number
    totalPages: number
    size: number
    number: number
}

export interface ApiResponse<T> {
    statusCode: number
    message: string
    data: T
}