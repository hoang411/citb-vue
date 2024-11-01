// src/components/order/OrderDetail.vue
<template>
  <div class="order-detail">
    <h2>Chi tiết đơn hàng</h2>

    <div v-if="orderStore.loading" class="loading">
      <el-skeleton :rows="3" animated />
    </div>

    <template v-else>
      <el-descriptions title="Thông tin đơn hàng" :column="1" border>
        <el-descriptions-item label="Mã đơn hàng">{{ order.id }}</el-descriptions-item>
        <el-descriptions-item label="Ngày đặt hàng">{{ order.created_at }}</el-descriptions-item>
        <el-descriptions-item label="Tổng tiền">{{ formatPrice(order.total_amount) }}</el-descriptions-item>
        <el-descriptions-item label="Trạng thái">{{ order.status }}</el-descriptions-item>
        <el-descriptions-item label="Phương thức thanh toán">{{ order.payment_method }}</el-descriptions-item>
        <el-descriptions-item label="Họ và tên">{{ order.full_name }}</el-descriptions-item>
        <el-descriptions-item label="Email">{{ order.email }}</el-descriptions-item>
        <el-descriptions-item label="Số điện thoại">{{ order.phone }}</el-descriptions-item>
        <el-descriptions-item label="Địa chỉ">{{ order.address }}</el-descriptions-item>
      </el-descriptions>

      <el-table :data="order.items" border>
        <el-table-column label="Sản phẩm" width="400">
          <template #default="{ row }">
            <div class="product-info">
              <el-image
                  :src="row.image"
                  fit="cover"
                  :preview-src-list="[row.image]"
                  class="product-image"
              />
              <div class="product-details">
                <h4>{{ row.product_name }}</h4>
                <p class="price">{{ formatPrice(row.price) }}</p>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Số lượng" prop="quantity" width="150" />

        <el-table-column label="Thành tiền">
          <template #default="{ row }">
            {{ formatPrice(row.price * row.quantity) }}
          </template>
        </el-table-column>
      </el-table>

      <div class="actions" v-if="canModifyOrder">
        <el-button type="primary" @click="handleUpdateStatus('processing')">
          Xác nhận đơn hàng
        </el-button>
        <el-button type="success" @click="handleUpdateStatus('shipped')">
          Gửi hàng
        </el-button>
        <el-button type="warning" @click="handleUpdateStatus('delivered')">
          Giao hàng thành công
        </el-button>
        <el-button type="danger" @click="handleUpdateStatus('cancelled')">
          Hủy đơn hàng
        </el-button>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useOrderStore } from '@/stores/order'
import { useAuthStore } from '@/stores/auth'
import { formatPrice } from '@/utils/formatters'

const route = useRoute()
const orderStore = useOrderStore()
const authStore = useAuthStore()

const order = ref<any>({})
const canModifyOrder = ref(false)

onMounted(async () => {
  const orderId = Number(route.params.id)
  order.value = await orderStore.fetchOrder(orderId)
  canModifyOrder.value = authStore.isAdmin
})

async function handleUpdateStatus(status: string) {
  try {
    await orderStore.updateOrderStatus(order.value.id, status)
    order.value.status = status
  } catch (error) {
    console.error('Failed to update order status:', error)
  }
}
</script>

<style scoped>
.order-detail {
  padding: 20px;
}

.product-info {
  display: flex;
  align-items: center;
}

.product-image {
  width: 80px;
  height: 80px;
  margin-right: 10px;
}

.product-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.price {
  font-weight: bold;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}
</style>