<template>
  <div class="product-price" :class="{ 'has-discount': discount }">
    <span class="current-price">{{ formatPrice(finalPrice) }}</span>
    <span v-if="discount" class="original-price">
      {{ formatPrice(price) }}
    </span>
    <span v-if="discount" class="discount-tag">
      -{{ discount }}%
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { formatPrice } from '@/utils/helpers'

const props = defineProps<{
  price: number
  discount?: number
}>()

const finalPrice = computed(() => {
  if (!props.discount) return props.price
  return props.price * (1 - props.discount / 100)
})
</script>

<style scoped>
.product-price {
  display: flex;
  align-items: center;
  gap: 8px;
}

.current-price {
  font-size: 16px;
  font-weight: 600;
  color: #f56c6c;
}

.original-price {
  font-size: 14px;
  color: #909399;
  text-decoration: line-through;
}

.discount-tag {
  padding: 2px 4px;
  background: #f56c6c;
  color: white;
  border-radius: 4px;
  font-size: 12px;
}
</style>