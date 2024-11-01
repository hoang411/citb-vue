import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
    Product,
    ProductFilter,
    CreateProductDTO,
    UpdateProductDTO
} from '@/interfaces'
import { productService } from '@/services/product.service'
import { ElMessage } from 'element-plus'

export const useProductStore = defineStore('product', () => {
    const products = ref<Product[]>([])
    const totalItems = ref(0)
    const loading = ref(false)
    const currentProduct = ref<Product | null>(null)

    const fetchProducts = async (filter: ProductFilter) => {
        try {
            loading.value = true
            const response = await productService.getProducts(filter)
            products.value = response.content
            totalItems.value = response.totalElements
        } catch (error) {
            console.error('Error fetching products:', error)
            ElMessage.error('Không thể tải danh sách sản phẩm')
            throw error
        } finally {
            loading.value = false
        }
    }

    const getProductById = async (id: number) => {
        try {
            loading.value = true
            const product = await productService.getProductById(id)
            currentProduct.value = product
            return product
        } catch (error) {
            console.error('Error getting product:', error)
            ElMessage.error('Không thể tải thông tin sản phẩm')
            throw error
        } finally {
            loading.value = false
        }
    }

    const createProduct = async (data: CreateProductDTO) => {
        try {
            loading.value = true
            const product = await productService.createProduct(data)
            ElMessage.success('Thêm sản phẩm thành công')
            return product
        } catch (error) {
            console.error('Error creating product:', error)
            ElMessage.error('Không thể thêm sản phẩm')
            throw error
        } finally {
            loading.value = false
        }
    }

    const updateProduct = async (id: number, data: UpdateProductDTO) => {
        try {
            loading.value = true
            const product = await productService.updateProduct(id, data)
            ElMessage.success('Cập nhật sản phẩm thành công')
            return product
        } catch (error) {
            console.error('Error updating product:', error)
            ElMessage.error('Không thể cập nhật sản phẩm')
            throw error
        } finally {
            loading.value = false
        }
    }

    const deleteProduct = async (id: number) => {
        try {
            loading.value = true
            await productService.deleteProduct(id)
            ElMessage.success('Xóa sản phẩm thành công')
        } catch (error) {
            console.error('Error deleting product:', error)
            ElMessage.error('Không thể xóa sản phẩm')
            throw error
        } finally {
            loading.value = false
        }
    }

    return {
        products,
        totalItems,
        loading,
        currentProduct,
        fetchProducts,
        getProductById,
        createProduct,
        updateProduct,
        deleteProduct
    }
})