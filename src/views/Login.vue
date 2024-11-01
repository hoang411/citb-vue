<template>
  <div class="login-container">
    <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="120px"
        class="login-form"
    >
      <h2 class="title">Đăng nhập</h2>

      <el-form-item label="Số điện thoại" prop="phone_number">
        <el-input v-model="form.phone_number" placeholder="Nhập số điện thoại" />
      </el-form-item>

      <el-form-item label="Mật khẩu" prop="password">
        <el-input
            v-model="form.password"
            type="password"
            placeholder="Nhập mật khẩu"
            show-password
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleLogin" :loading="loading">
          Đăng nhập
        </el-button>
        <router-link to="/register">
          <el-button>Chưa có tài khoản? Đăng ký</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const authStore = useAuthStore()
const formRef = ref<FormInstance>()
const loading = ref(false)

const form = ref({
  phone_number: '',
  password: ''
})

const rules: FormRules = {
  phone_number: [
    { required: true, message: 'Vui lòng nhập số điện thoại', trigger: 'blur' },
    { pattern: /^\d{8,}$/, message: 'Số điện thoại phải có ít nhất 8 chữ số', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  if (!formRef.value) return

  try {
    loading.value = true
    await formRef.value.validate()

    await authStore.login(form.value.phone_number, form.value.password)
    ElMessage.success('Đăng nhập thành công!')
    router.push('/')
  } catch (error: any) {
    console.error('Đăng nhập thất bại:', error)
    const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại'
    ElMessage.error(errorMessage)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f7fa;
}

.login-form {
  width: 100%;
  max-width: 500px;
  padding: 30px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 30px;
  color: #409EFF;
}

.el-button {
  width: 100%;
  margin-bottom: 10px;
}

.el-button + .el-button {
  margin-left: 0;
}
</style>