<template>
  <div class="inventory-check">
    <h1>Inventory check</h1>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Quantity</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.id }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.quantity }}</td>
        <td>
          <button @click="editProduct(product)">Edit</button>
          <button @click="deleteProduct(product)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()
const products = ref<Product[]>([])

onMounted(async () => {
  try {
    await productStore.fetchProducts()
    products.value = productStore.products
  } catch (error) {
    console.error('Error fetching products:', error)
  }
})

const editProduct = (product: Product) => {
  // Edit product logic
}

const deleteProduct = (product: Product) => {
  // Delete product logic
}
</script>

<style>
.inventory-check {
  text-align: center;
}
</style>