// src/stores/inventory.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { inventoryService } from '@/services/inventory.service'
import type { InventoryCheck, InventoryReceipt } from '@/interfaces/inventory.interface'

export const useInventoryStore = defineStore('inventory', () => {
    const inventoryChecks = ref<InventoryCheck[]>([])
    const inventoryReceipts = ref<InventoryReceipt[]>([])
    const loading = ref(false)

    async function fetchInventoryChecks(params = {}) {
        loading.value = true
        try {
            const response = await inventoryService.getInventoryChecks(params)
            inventoryChecks.value = response.data
        } finally {
            loading.value = false
        }
    }

    async function createInventoryCheck(checkData) {
        const response = await inventoryService.createInventoryCheck(checkData)
        inventoryChecks.value.unshift(response.data)
        return response.data
    }

    async function fetchInventoryReceipts(params = {}) {
        loading.value = true
        try {
            const response = await inventoryService.getInventoryReceipts(params)
            inventoryReceipts.value = response.data
        } finally {
            loading.value = false
        }
    }

    async function createInventoryReceipt(receiptData) {
        const response = await inventoryService.createInventoryReceipt(receiptData)
        inventoryReceipts.value.unshift(response.data)
        return response.data
    }

    return {
        inventoryChecks,
        inventoryReceipts,
        loading,
        fetchInventoryChecks,
        createInventoryCheck,
        fetchInventoryReceipts,
        createInventoryReceipt
    }
})