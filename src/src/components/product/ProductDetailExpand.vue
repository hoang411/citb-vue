<template>
  <div class="product-detail-expand">
    <el-row :gutter="20">
      <!-- Thông tin cơ bản -->
      <el-col :span="16">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="Mã sản phẩm">
            {{ product.id }}
          </el-descriptions-item>
          <el-descriptions-item label="Danh mục">
            {{ product.category_name }}
          </el-descriptions-item>
          <el-descriptions-item label="Ngày tạo">
            {{ formatDateTime(product.created_at) }}
          </el-descriptions-item>
          <el-descriptions-item label="Cập nhật lần cuối">
            {{ formatDateTime(product.updated_at) }}
          </el-descriptions-item>
          <el-descriptions-item label="Mô tả" :span="2">
            {{ product.description || 'Chưa có mô tả' }}
          </el-descriptions-item>
        </el-descriptions>
      </el-col>

      <!-- Hình ảnh -->
      <el-col :span="8">
        <div class="image-gallery">
          <el-image
              v-for="(image, index) in product.images"
              :key="index"
              :src="image"
              :preview-src-list="product.images"
              fit="cover"
              class="gallery-image"
          >
            <template #error>
              <div class="image-error">
                <el-icon><Picture /></el-icon>
              </div>
            </template>
          </el-image>
        </div>
      </el-col>
    </el-row>

    <!-- Lịch sử giá và tồn kho -->
    <el-row :gutter="20" class="mt-4">
      <el-col :span="12">
        <h4>Lịch sử giá</h4>
        <el-timeline>
          <el-timeline-item
              v-for="(history, index) in priceHistory"
              :key="index"
              :timestamp="formatDateTime(history.date)"
              :type="getTimelineItemType(index)"
          >
            {{ formatPrice(history.price) }}
          </el-timeline-item>
        </el-timeline>
      </el-col>

      <el-col :span="12">
        <h4>Lịch sử tồn kho</h4>
        <el-timeline>
          <el-timeline-item
              v-for="(history, index) in stockHistory"
              :key="index"
              :timestamp="formatDateTime(history.date)"
              :type="getTimelineItemType(index)"
          >
            Số lượng: {{ history.quantity }}
          </el-timeline-item>
        </el-timeline>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Picture } from '@element-plus/icons-vue'
import type { Product } from '@/interfaces/product.interface'
import { formatDateTime, formatPrice } from '@/utils/helpers'
import { productService } from '@/services/product.service'

const props = defineProps<{
  product: Product
}>()

interface PriceHistory {
  date: string
  price: number
}

interface StockHistory {
  date: string
  quantity: number
}

const priceHistory = ref<PriceHistory[]>([])
const stockHistory = ref<StockHistory[]>([])

const getTimelineItemType = (index: number) => {
  const types = ['primary', 'success', 'warning', 'info']
  return types[index % types.length]
}

const fetchHistories = async () => {
  try {
    const [priceData, stockData] = await Promise.all([
      productService.getPriceHistory(props.product.id),
      productService.getStockHistory(props.product.id)
    ])
    priceHistory.value = priceData
    stockHistory.value = stockData
  } catch (error) {
    console.error('Error fetching histories:', error)
  }
}

onMounted(() => {
  fetchHistories()
})
</script>

<style scoped>
.product-detail-expand {
  padding: 20px;
  background: #f8f9fa;
}

.image-gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.gallery-image {
  width: 100%;
  height: 120px;
  border-radius: 4px;
  overflow: hidden;
}

.image-error {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 24px;
}

.mt-4 {
  margin-top: 16px;
}

h4 {
  margin: 0 0 16px;
  font-size: 16px;
  color: #303133;
}
</style>