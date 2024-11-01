<!-- src/views/Products.vue -->
<template>
  <div>
    <h2>Products</h2>
    <el-table :data="productStore.products">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="productName" label="Name" />
      <el-table-column prop="price" label="Price" />
      <el-table-column label="Actions">
        <template #default="scope">
          <el-button @click="viewProduct(scope.row.id)">View</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'

const router = useRouter()
const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})

const viewProduct = (id: number) => {
  router.push(`/products/${id}`)
}
</script>