// src/interfaces/inventory.interface.ts
export interface InventoryCheck {
    id: number
    product_id: number
    product_name: string
    previous_quantity: number
    current_quantity: number
    difference: number
    note: string
    checked_by: number
    checked_at: string
}

export interface InventoryReceipt {
    id: number
    supplier_id: number
    total_amount: number
    status: ReceiptStatus
    items: InventoryReceiptItem[]
    created_at: string
    created_by: number
}

export enum ReceiptStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED'
}

export interface InventoryReceiptItem {
    id: number
    product_id: number
    quantity: number
    price: number
    product_name: string
}