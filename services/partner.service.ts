// src/services/partner.service.ts
import api from './api'
import type { Partner, PartnerStatus } from '@/interfaces/partner.interface'

export const partnerService = {
    async getPartners(params = {}) {
        const response = await api.get('/partners', { params })
        return response.data
    },

    async getPartnerById(id: number) {
        const response = await api.get(`/partners/${id}`)
        return response.data
    },

    async createPartner(partnerData) {
        const response = await api.post('/partners', partnerData)
        return response.data
    },

    async updatePartner(partnerId: number, partnerData) {
        const response = await api.put(`/partners/${partnerId}`, partnerData)
        return response.data
    },

    async deletePartner(partnerId: number) {
        await api.delete(`/partners/${partnerId}`)
    }
}