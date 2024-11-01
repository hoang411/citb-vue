// src/interfaces/order.interface.ts
export interface Order {
    id: number;
    user_id: number;
    full_name: string;
    email: string;
    phone: string;
    address: string;
    payment_method: string;
    total_amount: number;
    status: string;
    created_at: string;
    updated_at: string;
    items: OrderItem[];
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    product_name: string;
    quantity: number;
    price: number;
    image: string;
}
export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    SHIPPING = 'SHIPPING',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}