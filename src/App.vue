<!-- src/App.vue -->
<template>
  <div id="app">
    <nav>
      <router-link to="/">Trang chủ</router-link> |
      <router-link to="/login">Đăng nhập</router-link> |
      <router-link to="/register">Đăng ký</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
// Không cần logic ở đây
</script>