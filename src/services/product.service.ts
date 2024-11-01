import api from './api'
import type {
    Product,
    ProductFilter,
    CreateProductDTO,
    UpdateProductDTO,
    PaginationResponse
} from '@/interfaces'

export const productService = {
    async getProducts(filter: ProductFilter): Promise<PaginationResponse<Product>> {
        const params = new URLSearchParams()

        if (filter.keyword) params.append('keyword', filter.keyword)
        if (filter.category_id) params.append('category_id', filter.category_id.toString())
        if (filter.status) params.append('status', filter.status)
        if (filter.min_price) params.append('min_price', filter.min_price.toString())
        if (filter.max_price) params.append('max_price', filter.max_price.toString())
        if (filter.page) params.append('page', filter.page.toString())
        if (filter.size) params.append('size', filter.size.toString())
        if (filter.sort) params.append('sort', filter.sort)

        const response = await api.get(`/products?${params.toString()}`)
        return response.data
    },

    async getProductById(id: number): Promise<Product> {
        const response = await api.get(`/products/${id}`)
        return response.data
    },

    async createProduct(data: CreateProductDTO): Promise<Product> {
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('price', data.price.toString())
        formData.append('quantity', data.quantity.toString())
        formData.append('category_id', data.category_id.toString())

        data.images.forEach(image => {
            formData.append('images', image)
        })

        const response = await api.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    },

    async updateProduct(id: number, data: UpdateProductDTO): Promise<Product> {
        const formData = new FormData()

        if (data.name) formData.append('name', data.name)
        if (data.description) formData.append('description', data.description)
        if (data.price) formData.append('price', data.price.toString())
        if (data.quantity) formData.append('quantity', data.quantity.toString())
        if (data.category_id) formData.append('category_id', data.category_id.toString())
        if (data.status) formData.append('status', data.status)

        if (data.images) {
            data.images.forEach(image => {
                formData.append('images', image)
            })
        }

        const response = await api.put(`/products/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    },

    async deleteProduct(id: number): Promise<void> {
        await api.delete(`/products/${id}`)
    },

    async updateProductStatus(id: number, status: ProductStatus): Promise<Product> {
        const response = await api.patch(`/products/${id}/status`, { status })
        return response.data
    },

    async uploadProductImages(id: number, images: File[]): Promise<string[]> {
        const formData = new FormData()
        images.forEach(image => {
            formData.append('images', image)
        })

        const response = await api.post(`/products/${id}/images`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    },

    async deleteProductImage(id: number, imageUrl: string): Promise<void> {
        await api.delete(`/products/${id}/images`, {
            data: { imageUrl }
        })
    }
}