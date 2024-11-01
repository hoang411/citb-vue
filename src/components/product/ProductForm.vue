<template>
  <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="120px"
      class="product-form"
  >
    <el-form-item label="Tên sản phẩm" prop="name">
      <el-input
          v-model="form.name"
          placeholder="Nhập tên sản phẩm"
          :maxlength="100"
          show-word-limit
      />
    </el-form-item>

    <el-form-item label="Danh mục" prop="category_id">
      <el-select
          v-model="form.category_id"
          placeholder="Chọn danh mục"
          class="w-100"
      >
        <el-option
            v-for="category in categories"
            :key="category.id"
            :label="category.name"
            :value="category.id"
        />
      </el-select>
    </el-form-item>

    <el-form-item label="Giá" prop="price">
      <el-input-number
          v-model="form.price"
          :min="0"
          :precision="0"
          :step="1000"
          class="w-100"
      />
    </el-form-item>

    <el-form-item label="Số lượng" prop="quantity">
      <el-input-number
          v-model="form.quantity"
          :min="0"
          :precision="0"
          class="w-100"
      />
    </el-form-item>

    <el-form-item label="Mô tả" prop="description">
      <el-input
          v-model="form.description"
          type="textarea"
          :rows="4"
          placeholder="Nhập mô tả sản phẩm"
          :maxlength="2000"
          show-word-limit
      />
    </el-form-item>

    <el-form-item label="Hình ảnh" prop="images">
      <product-images
          v-model:images="form.images"
          v-model:imageUrls="form.imageUrls"
          :limit="5"
      />
    </el-form-item>

    <el-form-item label="Trạng thái" prop="status" v-if="isEditing">
      <el-select v-model="form.status" class="w-100">
        <el-option
            v-for="status in productStatuses"
            :key="status"
            :label="getStatusLabel(status)"
            :value="status"
        />
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="handleSubmit" :loading="loading">
        {{ isEditing ? 'Cập nhật' : 'Thêm mới' }}
      </el-button>
      <el-button @click="handleCancel">Hủy</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ProductStatus } from '@/interfaces/product.interface'
import { useCategoryStore } from '@/stores/category'
import ProductImages from './ProductImages.vue'

const props = defineProps<{
  product?: any // Sẽ định nghĩa interface sau
}>()

const emit = defineEmits<{
  (e: 'submit', formData: FormData): void
  (e: 'cancel'): void
}>()

const categoryStore = useCategoryStore()
const formRef = ref<FormInstance>()
const loading = ref(false)

const form = ref({
  name: '',
  category_id: undefined,
  price: 0,
  quantity: 0,
  description: '',
  status: ProductStatus.ACTIVE,
  images: [] as File[],
  imageUrls: [] as string[]
})

// Tiếp tục với validation rules và các methods...