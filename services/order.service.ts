// src/services/order.service.ts
import api from './api'
import type { Order } from '@/interfaces/order.interface'

export const orderService = {
    async getOrders() {
        const response = await api.get('/orders')
        return response.data
    },

    async getOrder(orderId: number) {
        const response = await api.get(`/orders/${orderId}`)
        return response.data
    },

    async createOrder(orderData: Partial<Order>) {
        const response = await api.post('/orders', orderData)
        return response.data
    },

    async updateOrderStatus(orderId: number, status: string) {
        const response = await api.put(`/orders/${orderId}/status`, { status })
        return response.data
    }
}