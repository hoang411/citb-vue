import api from './api'
import type { Category } from '@/interfaces/category.interface'

export const categoryService = {
    async getCategories(): Promise<Category[]> {
        const response = await api.get('/categories')
        return response.data
    }
}