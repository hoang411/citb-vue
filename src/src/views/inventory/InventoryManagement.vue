// src/views/inventory/InventoryManagement.vue
<template>
  <div class="inventory-management">
    <h2>Inventory Management</h2>

    <!-- Inventory Checks Table -->
    <el-table :data="inventoryStore.inventoryChecks" v-loading="inventoryStore.loading">
      <el-table-column prop="id" label="Check ID" width="100" />
      <el-table-column prop="product_name" label="Product" />
      <el-table-column prop="previous_quantity" label="Previous Quantity" />
      <el-table-column prop="current_quantity" label="Current Quantity" />
      <el-table-column prop="difference" label="Difference" />
      <el-table-column prop="note" label="Note" />
      <el-table-column prop="checked_by" label="Checked By" />
      <el-table-column prop="checked_at" label="Checked At" />
      <el-table-column label="Actions">
        <template #default="scope">
          <el-button
              size="small"
              @click="showCheckDetail(scope.row)"
          >
            View
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Inventory Receipts Table -->
    <el-table :data="inventoryStore.inventoryReceipts" v-loading="inventoryStore.loading">
      <el-table-column prop="id" label="Receipt ID" width="100" />
      <el-table-column prop="supplier_id" label="Supplier" />
      <el-table-column prop="total_amount" label="Total Amount" />
      <el-table-column prop="status" label="Status" />
      <el-table-column label="Actions">
        <template #default="scope">
          <el-button
              size="small"
              @click="showReceiptDetail(scope.row)"
          >
            View
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useInventoryStore } from '@/stores/inventory'
import InventoryCheckDetail from '@/components/inventory/InventoryCheckDetail.vue'
import InventoryReceiptDetail from '@/components/inventory/InventoryReceiptDetail.vue'

const inventoryStore = useInventoryStore()
const checkDetailDialogVisible = ref(false)
const receiptDetailDialogVisible = ref(false)
const selectedCheck = ref(null)
const selectedReceipt = ref(null)

function showCheckDetail(check) {
  selectedCheck.value = check
  checkDetailDialogVisible.value = true
}

function showReceiptDetail(receipt) {
  selectedReceipt.value = receipt
  receiptDetailDialogVisible.value = true
}

// Load initial data
onMounted(() => {
  inventoryStore.fetchInventoryChecks()
  inventoryStore.fetchInventoryReceipts()
})
</script>