<!-- src/views/Home.vue -->
<template>
  <div class="home">
    <h1>Trang chủ</h1>
    <div v-if="user">
      <p>Xin chào, {{ user.fullName }}!</p>
      <button @click="logout">Đăng xuất</button>
    </div>
    <div v-else>
      <p>Vui lòng đăng nhập để tiếp tục.</p>
      <router-link to="/login">Đăng nhập</router-link> |
      <router-link to="/register">Đăng ký</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/auth.service'

const router = useRouter()
const user = ref(null)

onMounted(async () => {
  try {
    const userData = await authService.getUserProfile()
    user.value = userData
  } catch (error) {
    console.error('Lỗi khi lấy thông tin người dùng:', error)
  }
})

const logout = () => {
  localStorage.removeItem('token')
  user.value = null
  router.push('/login')
}
</script>