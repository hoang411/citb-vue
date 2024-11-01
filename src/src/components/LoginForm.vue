<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="phoneNumber">Phone Number:</label>
        <input id="phoneNumber" v-model="phoneNumber" type="text" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" v-model="password" type="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import api from '../services/api';

export default defineComponent({
  name: 'LoginForm',
  setup() {
    const phoneNumber = ref('');
    const password = ref('');
    const message = ref('');

    const handleSubmit = async () => {
      try {
        const response = await api.login(phoneNumber.value, password.value);
        message.value = 'Login successful!';
        console.log(response.data);
        // Xử lý dữ liệu trả về ở đây (ví dụ: lưu token)
      } catch (error) {
        message.value = 'Login failed! ' + (error as Error).message;
      }
    };

    return {
      phoneNumber,
      password,
      message,
      handleSubmit,
    };
  },
});
</script>