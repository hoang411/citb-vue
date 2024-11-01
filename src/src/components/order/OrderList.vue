// src/components/order/OrderList.vue
<template>
  <div class="order-list">
    <h2>Đơn hàng</h2>

    <div v-if="orderStore.loading" class="loading">
      <el-skeleton :rows="3" animated />
    </div>

    <div v-else-if="orderStore.orderCount === 0" class="empty-orders">
      <el-empty description="Không có đơn hàng nào">
        <el-button type="primary" @click="$router.push('/products')"> Tiếp tục mua sắm
        </el-button>
      </el-empty>
    </div>

    <template v-else>
      <el-table :data="orderStore.orders" border>
        <el-table-column label="Mã đơn hàng" prop="id" width="150" />
        <el-table-column label="Ngày đặt hàng" prop="created_at" width="150" />
        <el-table-column label="Tổng tiền" prop="total_amount" width="150" />
        <el-table-column label="Trạng thái" prop="status" width="150" />
        <el-table-column label="Thao tác" width="150">
          <template #default="{ row }">
            <el-button type="primary" @click="handleViewOrder(row.id)">
              Xem chi tiết
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/order'

const router = useRouter()
const orderStore = useOrderStore()

onMounted(() => {
  orderStore.fetchOrders()
})

function handleViewOrder(orderId: number) {
  router.push(`/orders/${orderId}`)
}
</script>

<style scoped>
.order-list {
  padding: 20px;
}
</style>