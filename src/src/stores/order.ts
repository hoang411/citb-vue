// src/stores/order.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { orderService } from '@/services/order.service'
import type { Order } from '@/interfaces/order.interface'

export const useOrderStore = defineStore('order', () => {
    const orders = ref<Order[]>([])
    const loading = ref(false)

    const orderCount = computed(() => orders.value.length)

    async function fetchOrders() {
        loading.value = true
        try {
            const response = await orderService.getOrders()
            orders.value = response.data
        } finally {
            loading.value = false
        }
    }

    async function fetchOrder(orderId: number) {
        loading.value = true
        try {
            const response = await orderService.getOrder(orderId)
            return response.data
        } finally {
            loading.value = false
        }
    }

    async function updateOrderStatus(orderId: number, status: string) {
        const response = await orderService.updateOrderStatus(orderId, status)
        const order = orders.value.find(order => order.id === orderId)
        if (order) {
            order.status = status
        }
        return response.data
    }

    return {
        orders,
        loading,
        orderCount,
        fetchOrders,
        fetchOrder,
        updateOrderStatus
    }
})