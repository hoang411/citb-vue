<template>
  <div class="product-list">
    <div class="filters">
      <el-input
          v-model="filter.keyword"
          placeholder="Tìm kiếm sản phẩm"
          @input="handleSearch"
      />
      <el-select v-model="filter.categoryId" @change="handleSearch">
        <el-option
            v-for="category in categories"
            :key="category.id"
            :label="category.name"
            :value="category.id"
        />
      </el-select>
    </div>

    <el-table
        v-loading="productStore.loading"
        :data="productStore.products"
        style="width: 100%"
    >
      <el-table-column prop="name" label="Tên sản phẩm" />
      <el-table-column prop="price" label="Giá">
        <template #default="{ row }">
          {{ formatPrice(row.price) }}
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="Số lượng" />
      <el-table-column label="Thao tác">
        <template #default="{ row }">
          <el-button-group>
            <el-button @click="handleEdit(row)">Sửa</el-button>
            <el-button
                type="danger"
                @click="handleDelete(row.id)"
            >
              Xóa
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        v-model:current-page="currentPage"
        :page-size="20"
        :total="productStore.totalItems"
        @current-change="handlePageChange"
    />

    <el-dialog
        v-model="dialogVisible"
        :title="editingProduct ? 'Sửa sản phẩm' : 'Thêm sản phẩm'"
    >
      <product-form
          :product="editingProduct"
          @submit="handleSubmit"
          @cancel="dialogVisible = false"
      />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Product, ProductFilter } from '@/interfaces'
import { formatPrice } from '@/utils/helpers'
import ProductForm from './ProductForm.vue'

const productStore = useProductStore()
const currentPage = ref(1)
const dialogVisible = ref(false)
const editingProduct = ref<Product | null>(null)
const filter = ref<ProductFilter>({})

const handleSearch = async () => {
  currentPage.value = 1
  await productStore.fetchProducts(filter.value, currentPage.value)
}

const handlePageChange = async (page: number) => {
  await productStore.fetchProducts(filter.value, page)
}

const handleEdit = (product: Product) => {
  editingProduct.value = product
  dialogVisible.value = true
}

const handleDelete = async (id: number) => {
  try {
    await ElMessageBox.confirm(
        'Bạn có chắc chắn muốn xóa sản phẩm này?',
        'Xác nhận xóa',
        {
          type: 'warning'
        }
    )
    await productStore.deleteProduct(id)
    ElMessage.success('Xóa sản phẩm thành công')
  } catch (error) {
    console.error('Error deleting product:', error)
  }
}

const handleSubmit = async (formData: FormData) => {
  try {
    if (editingProduct.value) {
      await productStore.updateProduct(editingProduct.value.id, formData)
      ElMessage.success('Cập nhật sản phẩm thành công')
    } else {
      await productStore.createProduct(formData)
      ElMessage.success('Thêm sản phẩm thành công')
    }
    dialogVisible.value = false
    editingProduct.value = null
  } catch (error) {
    console.error('Error submitting product:', error)
  }
}

onMounted(async () => {
  await productStore.fetchProducts()
})
</script>

<style scoped>
.product-list {
  padding: 20px;
}

.filters {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}
</style>