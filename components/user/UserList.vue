// src/components/user/User List.vue
<template>
  <div class="user-list">
    <h2>Danh sách người dùng</h2>

    <div v-if="userStore.loading" class="loading">
      <el-skeleton :rows="3" animated />
    </div>

    <template v-else>
      <el-table :data="userStore.users" border>
        <el-table-column label="ID" prop="id" width="100" />
        <el-table-column label="Tên" prop="name" />
        <el-table-column label="Email" prop="email" />
        <el-table-column label="Vai trò" prop="role" width="150" />
        <el-table-column label="Trạng thái" prop="status" width="150" />
        <el-table-column label="Thao tác" width="150">
          <template #default ="{ row }">
            <el-button type="primary" @click="handleEditUser (row.id)">
              Sửa
            </el-button>
            <el-button type="danger" @click="handleDeleteUser (row.id)">
              Xóa
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUser Store } from '@/stores/user'

const router = useRouter()
const userStore = useUser Store()

onMounted(() => {
  userStore.fetchUsers()
})

function handleEditUser (userId: number) {
  router.push(`/users/${userId}`)
}

async function handleDeleteUser (userId: number) {
  try {
    await ElMessageBox.confirm(
        'Bạn có chắc chắn muốn xóa người dùng này?',
        'Xác nhận xóa',
        {
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Hủy',
          type: 'warning'
        }
    )
    await userStore.deleteUser (userId)
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to delete user:', error)
    }
  }
}
</script>

<style scoped>
.user-list {
  padding: 20px;
}
</style>