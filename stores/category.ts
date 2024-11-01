import { defineStore } from 'pinia'
import { ref } from 'vue'
import { categoryService } from '@/services/category.service'
import type { Category } from '@/interfaces/category.interface'

export const useCategoryStore = defineStore('category', () => {
    const categories = ref<Category[]>([])

    const fetchCategories = async () => {
        try {
            const response = await categoryService.getCategories()
            categories.value = response
            return response
        } catch (error) {
            console.error('Error fetching categories:', error)
            throw error
        }
    }

    return {
        categories,
        fetchCategories
    }
})