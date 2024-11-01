// src/views/order/OrderManagement.vue
<template>
  <div class="order-management">
    <h2>Order Management</h2>

    <!-- Order Filters -->
    <el-form :inline="true" :model="filterForm" class="filter-form">
      <el-form-item label="Status">
        <el-select v-model="filterForm.status">
          <el-option
              v-for="status in Object.values(OrderStatus)"
              :key="status"
              :label="status"
              :value="status"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleFilter">Filter</el-button>
      </el-form-item>
    </el-form>

    <!-- Orders Table -->
    <el-table :data="orderStore.orders" v-loading="orderStore.loading">
      <el-table-column prop="id" label="Order ID" width="100" />
      <el-table-column prop="created_at" label="Date">
        <template #default="scope">
          {{ formatDate(scope.row.created_at) }}
        </template>
      </el-table-column>
      <el-table-column prop="total_amount" label="Total">
        <template #default="scope">
          {{ formatPrice(scope.row.total_amount) }}
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Status">
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.status)">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions">
        <template #default="scope">
          <el-button-group>
            <el-button
                size="small"
                @click="showOrderDetail(scope.row)"
            >
              View
            </el-button>
            <el-button
                size="small"
                type="primary"
                v-if="canUpdateStatus(scope.row.status)"
                @click="showStatusUpdate(scope.row)"
            >
              Update Status
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- Order Detail Dialog -->
    <el-dialog
        v-model="detailDialogVisible"
        title="Order Detail"
        width="70%"
    >
      <order-detail
          v-if="selectedOrder"
          :order="selectedOrder"
          @status-updated="handleStatusUpdated"
      />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useOrderStore } from '@/stores/order'
import { OrderStatus } from '@/interfaces/order.interface'
import OrderDetail from '@/components/order/OrderDetail.vue'
import { formatDate, formatPrice } from '@/utils/formatters'

const orderStore = useOrderStore()
const detailDialogVisible = ref(false)
const selectedOrder = ref(null)
const filterForm = ref({
  status: '',
  date_range: []
})

function getStatusType(status: OrderStatus) {
  const types = {
    [OrderStatus.PENDING]: 'warning',
    [OrderStatus.CONFIRMED]: 'primary',
    [OrderStatus.SHIPPING]: 'info',
    [OrderStatus.DELIVERED]: 'success',
    [OrderStatus.CANCELLED]: 'danger'
  }
  return types[status] || 'info'
}

function canUpdateStatus(status: OrderStatus) {
  return status !== OrderStatus.DELIVERED && status !== OrderStatus.CANCELLED
}

async function handleFilter() {
  await orderStore.fetchOrders(filterForm.value)
}

function showOrderDetail(order) {
  selectedOrder.value = order
  detailDialogVisible.value = true
}

async function handleStatusUpdated() {
  await orderStore.fetchOrders(filterForm.value)
  detailDialogVisible.value = false
}

// Load initial data
onMounted(() => {
  orderStore.fetchOrders()
})
</script>