<template>
  <el-card class="product-card" :body-style="{ padding: '0px' }">
    <div class="product-image">
      <el-image
          :src="product.images[0] || '/placeholder.png'"
          fit="cover"
          :preview-src-list="product.images"
      >
        <template #error>
          <div class="image-placeholder">
            <el-icon><Picture /></el-icon>
          </div>
        </template>
      </el-image>
      <div class="product-status" v-if="product.status !== 'ACTIVE'">
        <product-status :status="product.status" />
      </div>
    </div>

    <div class="product-content">
      <h3 class="product-name" :title="product.name">
        {{ product.name }}
      </h3>

      <div class="product-category">
        {{ product.category_name }}
      </div>

      <div class="product-price">
        <product-price :price="product.price" />
      </div>

      <div class="product-quantity">
        <product-quantity :quantity="product.quantity" />
      </div>

      <div class="product-actions">
        <el-button-group>
          <el-button
              type="primary"
              size="small"
              @click="$emit('edit', product)"
          >
            <el-icon><Edit /></el-icon>
          </el-button>
          <el-button
              type="danger"
              size="small"
              @click="$emit('delete', product)"
          >
            <el-icon><Delete /></el-icon>
          </el-button>
        </el-button-group>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { Picture, Edit, Delete } from '@element-plus/icons-vue'
import type { Product } from '@/interfaces/product.interface'
import ProductStatus from './common/ProductStatus.vue'
import ProductPrice from './common/ProductPrice.vue'
import ProductQuantity from './common/ProductQuantity.vue'

defineProps<{
  product: Product
}>()

defineEmits<{
  (e: 'edit', product: Product): void
  (e: 'delete', product: Product): void
}>()
</script>

<style scoped>
.product-card {
  width: 100%;
  transition: all 0.3s;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}

.product-image {
  position: relative;
  width: 100%;
  height: 200px;
}

.product-image :deep(.el-image) {
  width: 100%;
  height: 100%;
}

.image-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 24px;
}

.product-status {
  position: absolute;
  top: 8px;
  right: 8px;
}

.product-content {
  padding: 14px;
}

.product-name {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  height: 44px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-category {
  margin-top: 8px;
  color: #909399;
  font-size: 14px;
}

.product-price {
  margin-top: 12px;
}

.product-quantity {
  margin-top: 8px;
}

.product-actions {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
}
</style>