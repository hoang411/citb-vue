<template>
  <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/login">Login</router-link></li>
      <li><router-link to="/register">Register</router-link></li>
      <li><router-link to="/admin">Admin</router-link></li >
      <li><router-link to="/warehouse">Warehouse</router-link></li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
</script>

<style>
nav {
  text-align: center;
}
</style>