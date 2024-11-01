// src/interfaces/partner.interface.ts
export interface Partner {
    id: number
    name: string
    contact_name: string
    contact_email: string
    contact_phone: string
    address: string
    status: PartnerStatus
    created_at: string
    updated_at: string
}

export enum PartnerStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}