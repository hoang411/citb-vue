// src/services/comment.service.ts
import api from './api'
import type { Comment } from '@/interfaces/comment.interface'

export const commentService = {
    async getComments(productId: number) {
        const response = await api.get(`/products/${productId}/comments`)
        return response.data
    },

    async addComment(productId: number, commentData: Partial<Comment>) {
        const response = await api.post(`/products/${productId}/comments`, commentData)
        return response.data
    },

    async updateComment(commentId: number, commentData: Partial<Comment>) {
        const response = await api.put(`/comments/${commentId}`, commentData)
        return response.data
    },

    async deleteComment(commentId: number) {
        await api.delete(`/comments/${commentId}`)
    }
}