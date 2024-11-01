export interface Product {
    id: number
    name: string
    description: string
    price: number
    quantity: number
    images: string[]
    category_id: number
    category_name?: string
    status: ProductStatus
    created_at: string
    updated_at: string
}

export enum ProductStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    OUT_OF_STOCK = 'OUT_OF_STOCK'
}

export interface ProductFilter {
    keyword?: string
    category_id?: number
    status?: ProductStatus
    min_price?: number
    max_price?: number
    page?: number
    size?: number
    sort?: string
}

export interface CreateProductDTO {
    name: string
    description: string
    price: number
    quantity: number
    category_id: number
    images: File[]
}

export interface UpdateProductDTO {
    name?: string
    description?: string
    price?: number
    quantity?: number
    category_id?: number
    status?: ProductStatus
    images?: File[]
}