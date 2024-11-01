// src/services/cart.service.ts
import api from './api'
import type { Cart } from '@/interfaces/cart.interface'

export const cartService = {
    async getCart() {
        const response = await api.get('/cart')
        return response.data
    },

    async addToCart(productId: number, quantity: number) {
        const response = await api.post('/cart/items', { product_id: productId, quantity })
        return response.data
    },

    async updateCartItem(itemId: number, quantity: number) {
        const response = await api.put(`/cart/items/${itemId}`, { quantity })
        return response.data
    },

    async removeFromCart(itemId: number) {
        await api.delete(`/cart/items/${itemId}`)
    },

    async clearCart() {
        await api.delete('/cart')
    }
}