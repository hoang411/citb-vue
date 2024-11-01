// src/views/partner/PartnerManagement.vue
<template>
  <div class="partner-management">
    <h2>Partner Management</h2>

    <!-- Partner Filters -->
    <el-form :inline="true" :model="filterForm" class="filter-form">
      <el-form-item label="Status">
        <el- select v-model="filterForm.status">
          <el-option
              v-for="status in Object.values(PartnerStatus)"
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

    <!-- Partners Table -->
    <el-table :data="partnerStore.partners" v-loading="partnerStore.loading">
      <el-table-column prop="id" label="Partner ID" width="100" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="contact_name" label="Contact Name" />
      <el-table-column prop="contact_email" label="Contact Email" />
      <el-table-column prop="contact_phone" label="Contact Phone" />
      <el-table-column prop="address" label="Address" />
      <el-table-column prop="status" label="Status">
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.status)">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Actions">
        <template #default="scope">
          <el-button
              size="small"
              @click="showPartnerDetail(scope.row)"
          >
            View
          </el-button>
          <el-button
              size="small"
              type="primary"
              @click="showPartnerUpdate(scope.row)"
          >
            Update
          </el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleDeletePartner(scope.row)"
          >
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Partner Detail Dialog -->
    <el-dialog
        v-model="detailDialogVisible"
        title="Partner Detail"
        width="70%"
    >
      <partner-detail
          v-if="selectedPartner"
          :partner="selectedPartner"
      />
    </el-dialog>

    <!-- Partner Update Dialog -->
    <el-dialog
        v-model="updateDialogVisible"
        title="Update Partner"
        width="70%"
    >
      <partner-update
          v-if="selectedPartner"
          :partner="selectedPartner"
          @partner-updated="handlePartnerUpdated"
      />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePartnerStore } from '@/stores/partner'
import PartnerDetail from '@/components/partner/PartnerDetail.vue'
import PartnerUpdate from '@/components/partner/PartnerUpdate.vue'
import { PartnerStatus } from '@/interfaces/partner.interface'

const partnerStore = usePartnerStore()
const detailDialogVisible = ref(false)
const updateDialogVisible = ref(false)
const selectedPartner = ref(null)
const filterForm = ref({
  status: ''
})

function getStatusType(status: PartnerStatus) {
  const types = {
    [PartnerStatus.ACTIVE]: 'success',
    [PartnerStatus.INACTIVE]: 'danger'
  }
  return types[status] || 'info'
}

async function handleFilter() {
  await partnerStore.fetchPartners(filterForm.value)
}

function showPartnerDetail(partner) {
  selectedPartner.value = partner
  detailDialogVisible.value = true
}

function showPartnerUpdate(partner) {
  selectedPartner.value = partner
  updateDialogVisible.value = true
}

async function handlePartnerUpdated() {
  await partnerStore.fetchPartners(filterForm.value)
  updateDialogVisible.value = false
}

async function handleDeletePartner(partner) {
  await partnerStore.deletePartner(partner.id)
  await partnerStore.fetchPartners(filterForm.value)
}

// Load initial data
onMounted(() => {
  partnerStore.fetchPartners()
})
</script>