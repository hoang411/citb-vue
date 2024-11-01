<!-- src/components/Navigation.vue -->
<template>
  <el-menu mode="horizontal">
    <el-menu-item index="1" @click="$router.push('/')">Home</el-menu-item>
    <el-menu-item index="2" @click="handleLogout">Logout</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
}
</script>