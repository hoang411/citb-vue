// src/interfaces/comment.interface.ts
export interface Comment {
    id: number
    product_id: number
    user_id: number
    content: string
    rating: number
    created_at: string
    updated_at: string
    user_name: string
}