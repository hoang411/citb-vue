// src/services/product.service.ts
import api from './api'

export const productService = {
    async getProducts(params) {
        const response = await api.get('/products', { params })
        return response.data
    },
    async getProductById(id) {
        const response = await api.get(`/products/${id}`)
        return response.data
    },
    async createProduct(productData) {
        const response = await api.post('/products', productData)
        return response.data
    },
    async updateProduct(id, productData) {
        const response = await api.put(`/products/${id}`, productData)
        return response.data
    },
    async deleteProduct(id) {
        await api.delete(`/products/${id}`)
    }
}