<template>
  <div class="login">
    <h2>Login</h2>
    <el-form :model="form" @submit.prevent="handleSubmit">
      <el-form-item label="Username" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  username: '',
  password: ''
})

async function handleSubmit() {
  try {
    await authStore.login(form.value)
    router.push('/')
  } catch (error) {
    console.error('Login failed:', error)
  }
}
</script>