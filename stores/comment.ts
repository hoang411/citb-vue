// src/stores/comment.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { commentService } from '@/services/comment.service'
import type { Comment } from '@/interfaces/comment.interface'

export const useCommentStore = defineStore('comment', () => {
    const comments = ref<Comment[]>([])
    const loading = ref(false)

    async function fetchComments(productId: number) {
        loading.value = true
        try {
            const response = await commentService.getComments(productId)
            comments.value = response.data
        } finally {
            loading.value = false
        }
    }

    async function addComment(productId: number, commentData: Partial<Comment>) {
        const response = await commentService.addComment(productId, commentData)
        comments.value.unshift(response.data)
        return response.data
    }

    async function updateComment(commentId: number, commentData: Partial<Comment>) {
        const response = await commentService.updateComment(commentId, commentData)
        const index = comments.value.findIndex(c => c.id === commentId)
        if (index !== -1) {
            comments.value[index] = response.data
        }
        return response.data
    }

    async function deleteComment(commentId: number) {
        await commentService.deleteComment(commentId)
        comments.value = comments.value.filter(c => c.id !== commentId)
    }

    return {
        comments,
        loading,
        fetchComments,
        addComment,
        updateComment,
        deleteComment
    }
})