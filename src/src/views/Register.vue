<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="register">
      <input type="text" v-model="phone_number" placeholder="Phone number" />
      <input type="password" v-model="password" placeholder="Password" />
      <input type="password" v-model="confirm_password" placeholder="Confirm password" />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const phone_number = ref('')
const password = ref('')
const confirm_password = ref('')

const authStore = useAuthStore()

const register = async () => {
  try {
    await authStore.register(phone_number.value, password.value, confirm_password.value)
  } catch (error) {
    console.error('Register error:', error)
  }
}
</script>

<style>
.register {
  text-align: center;
}
</style>