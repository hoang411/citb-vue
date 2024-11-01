// src/stores/partner.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { partnerService } from '@/services/partner.service'
import type { Partner, PartnerStatus } from '@/interfaces/partner.interface'

export const usePartnerStore = defineStore('partner', () => {
    const partners = ref<Partner[]>([])
    const loading = ref(false)

    async function fetchPartners(params = {}) {
        loading.value = true
        try {
            const response = await partnerService.getPartners(params)
            partners.value = response.data
        } finally {
            loading.value = false
        }
    }

    async function createPartner(partnerData) {
        const response = await partnerService.createPartner(partnerData)
        partners.value.unshift(response.data)
        return response.data
    }

    async function updatePartner(partnerId: number, partnerData) {
        const response = await partnerService.updatePartner(partnerId, partnerData)
        const index = partners.value.findIndex(p => p.id === partnerId)
        if (index !== -1) {
            partners.value[index] = response.data
        }
        return response.data
    }

    async function deletePartner(partnerId: number) {
        await partnerService.deletePartner(partnerId)
        partners.value = partners.value.filter(p => p.id !== partnerId)
    }

    return {
        partners,
        loading,
        fetchPartners,
        createPartner,
        updatePartner,
        deletePartner
    }
})