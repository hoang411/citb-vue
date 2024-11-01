// src/interfaces/cart.interface.ts
export interface CartItem {
    id: number;
    product_id: number;
    product_name: string;
    quantity: number;
    price: number;
    image: string;
}

export interface Cart {
    items: CartItem[];
    total_amount: number;
}