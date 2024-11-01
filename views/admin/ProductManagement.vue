// src/services/product.service.ts
import api from './api'

export const productService = {
async getProducts(params) {
const response = await api.get('/products', { params })
return response.data
},
async getProductById(id) {
const response = await api.get(`/products/${id}`)
return response.data
},
async createProduct(productData) {
const response = await api.post('/products', productData)
return response.data
},
async updateProduct(id, productData) {
const response = await api.put(`/products/${id}`, productData)
return response.data
},
async deleteProduct(id) {
await api.delete(`/products/${id}`)
}
}

// src/views/admin/ProductManagement.vue
<template>
  <div class="product-management">
    <h2>Product Management</h2>
    <el-button @click="showCreateForm = true">Add New Product</el-button>

    <el-table :data="productStore.products " v-loading="productStore.loading">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="price" label="Price"></el-table-column>
      <el-table-column label="Actions">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)">Edit</el-button>
          <el-button @click="handleDelete(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="showCreateForm" title="Create New Product">
      <el-form :model="createForm" @submit.prevent="handleCreate">
        <el-form-item label="Name" prop="name">
          <el-input v-model="createForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Price" prop="price">
          <el-input v-model="createForm.price"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">Create</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()
const showCreateForm = ref(false)
const createForm = ref({
  name: '',
  price: 0
})

async function handleCreate() {
  try {
    await productStore.createProduct(createForm.value)
    showCreateForm.value = false
  } catch (error) {
    console.error('Failed to create product:', error)
  }
}
</script>