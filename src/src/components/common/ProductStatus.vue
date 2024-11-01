<template>
  <el-tag
      :type="getStatusType"
      :effect="effect"
      size="small"
  >
    {{ getStatusLabel }}
  </el-tag>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ProductStatus } from '@/interfaces/product.interface'

const props = defineProps<{
  status: ProductStatus
  effect?: 'light' | 'dark' | 'plain'
}>()

const getStatusType = computed(() => {
  const types = {
    [ProductStatus.ACTIVE]: 'success',
    [ProductStatus.INACTIVE]: 'info',
    [ProductStatus.OUT_OF_STOCK]: 'danger'
  }
  return types[props.status]
})

const getStatusLabel = computed(() => {
  const labels = {
    [ProductStatus.ACTIVE]: 'Đang bán',
    [ProductStatus.INACTIVE]: 'Ngừng bán',
    [ProductStatus.OUT_OF_STOCK]: 'Hết hàng'
  }
  return labels[props.status]
})
</script>