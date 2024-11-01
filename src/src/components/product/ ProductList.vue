<template>
  <div class="product-list">
    <div class="header-actions">
      <h2>Quản lý sản phẩm</h2>
      <el-button type="primary" @click="handleAdd">Thêm sản phẩm</el-button>
    </div>

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
        v-loading="loading || productStore.loading"
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
      <el-table-column label="Thao tác" width="200">
        <template #default="{ row }">
          <el-button-group>
            <el-button
                type="primary"
                @click="handleEdit(row)"
                v-permission="['ADMIN', 'MANAGER']"
            >
              Sửa
            </el-button>
            <el-button
                type="danger"
                @click="handleDelete(row.id)"
                v-permission="['ADMIN']"
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
import { useAuthStore } from '@/stores/auth'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Product, ProductFilter } from '@/interfaces/product.interface'
import { formatPrice } from '@/utils/helpers'
import ProductForm from './ProductForm.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const productStore = useProductStore()

// Kiểm tra quyền truy cập
const checkPermission = () => {
  if (!authStore.user?.roles.includes('ADMIN')) {
    ElMessage.error('Bạn không có quyền truy cập trang này')
    router.push({ name: 'home' })
    return false
  }
  return true
}

// Các ref và state
const currentPage = ref(1)
const dialogVisible = ref(false)
const editingProduct = ref<Product | null>(null)
const filter = ref<ProductFilter>({})
const loading = ref(false)

const handleAdd = () => {
  editingProduct.value = null
  dialogVisible.value = true
}

// ... các hàm xử lý khác giữ nguyên ...

onMounted(async () => {
  if (!checkPermission()) return

  loading.value = true
  try {
    await productStore.fetchProducts()
  } catch (error) {
    ElMessage.error('Failed to fetch products')
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.product-list {
  padding: 20px;
}

.header-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.filters {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}
</style>