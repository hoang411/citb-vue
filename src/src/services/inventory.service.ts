// src/services/inventory.service.ts
import api from './api'
import type { InventoryCheck, InventoryReceipt } from '@/interfaces/inventory.interface'

export const inventoryService = {
    async getInventoryChecks(params = {}) {
        const response = await api.get('/inventory/checks', { params })
        return response.data
    },

    async createInventoryCheck(checkData) {
        const response = await api.post('/inventory/checks', checkData)
        return response.data
    },

    async getInventoryReceipts(params = {}) {
        const response = await api.get('/inventory/receipts', { params })
        return response.data
    },

    async createInventoryReceipt(receiptData) {
        const response = await api.post('/inventory/receipts', receiptData)
        return response.data
    }
}