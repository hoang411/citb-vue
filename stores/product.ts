// src/stores/product.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productService } from '@/services/product.service'

export const useProductStore = defineStore('product', () => {
    const products = ref([])
    const loading = ref(false)

    async function fetchProducts(params = {}) {
        loading.value = true
        try {
            const response = await productService.getProducts(params)
            products.value = response.data
        } catch (error) {
            console.error('Failed to fetch products:', error)
        } finally {
            loading.value = false
        }
    }

    async function createProduct(productData) {
        const response = await productService.createProduct(productData)
        products.value.push(response.data)
    }

    return { products, loading, fetchProducts, createProduct }
})