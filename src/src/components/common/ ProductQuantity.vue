<template>
  <div class="product-quantity">
    <el-tag :type="getQuantityType" size="small">
      {{ getQuantityLabel }}
    </el-tag>
    <span class="quantity-number">
      {{ quantity }} sản phẩm
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  quantity: number
  threshold?: number
}>()

const getQuantityType = computed(() => {
  const threshold = props.threshold || 10
  if (props.quantity <= 0) return 'danger'
  if (props.quantity <= threshold) return 'warning'
  return 'success'
})

const getQuantityLabel = computed(() => {
  if (props.quantity <= 0) return 'Hết hàng'
  const threshold = props.threshold || 10
  if (props.quantity <= threshold) return 'Sắp hết'
  return 'Còn hàng'
})
</script>

<style scoped>
.product-quantity {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-number {
  font-size: 14px;
  color: #606266;
}
</style>