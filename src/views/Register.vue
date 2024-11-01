<template>
  <div class="register-container">
    <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="120px"
        class="register-form"
    >
      <h2 class="title">Đăng ký tài khoản</h2>

      <el-form-item label="Họ tên" prop="full_name">
        <el-input
            v-model="form.full_name"
            placeholder="Nhập họ tên"
            :maxlength="50"
        />
      </el-form-item>

      <el-form-item label="Email" prop="email">
        <el-input
            v-model="form.email"
            type="email"
            placeholder="Nhập email"
            :maxlength="100"
        />
      </el-form-item>

      <el-form-item label="Số điện thoại" prop="phone_number">
        <el-input
            v-model="form.phone_number"
            placeholder="Nhập số điện thoại"
            :maxlength="15"
        />
      </el-form-item>

      <el-form-item label="Mật khẩu" prop="password">
        <el-input
            v-model="form.password"
            type="password"
            placeholder="Nhập mật khẩu"
            show-password
            :maxlength="50"
        />
      </el-form-item>

      <el-form-item label="Địa chỉ" prop="address">
        <el-input
            v-model="form.address"
            type="textarea"
            placeholder="Nhập địa chỉ"
            :rows="2"
            :maxlength="200"
        />
      </el-form-item>

      <el-form-item label="Ngày sinh" prop="date_of_birth">
        <el-date-picker
            v-model="form.date_of_birth"
            type="date"
            placeholder="Chọn ngày sinh"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
        />
      </el-form-item>

      <el-form-item>
        <el-button
            type="primary"
            @click="handleRegister"
            :loading="loading"
            :disabled="loading"
        >
          {{ loading ? 'Đang đăng ký...' : 'Đăng ký' }}
        </el-button>
        <router-link to="/login">
          <el-button>Đã có tài khoản? Đăng nhập</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/services/auth.service'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const router = useRouter()
const formRef = ref<FormInstance>()
const loading = ref(false)

const form = ref({
  full_name: '',
  email: '',
  phone_number: '',
  password: '',
  address: '',
  date_of_birth: ''
})

const validatePhoneNumber = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('Vui lòng nhập số điện thoại'))
  } else if (!/^\d{8,}$/.test(value)) {
    callback(new Error('Số điện thoại phải có ít nhất 8 chữ số'))
  } else {
    callback()
  }
}

const validatePassword = (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('Vui lòng nhập mật khẩu'))
  } else if (value.length < 3) {
    callback(new Error('Mật khẩu phải có ít nhất 3 ký tự'))
  } else {
    callback()
  }
}

const rules: FormRules = {
  full_name: [
    { required: true, message: 'Vui lòng nhập họ tên', trigger: 'blur' },
    { min: 2, message: 'Họ tên phải có ít nhất 2 ký tự', trigger: 'blur' },
    { max: 50, message: 'Họ tên không được quá 50 ký tự', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
    { type: 'email', message: 'Email không hợp lệ', trigger: 'blur' },
    { max: 100, message: 'Email không được quá 100 ký tự', trigger: 'blur' }
  ],
  phone_number: [
    { required: true, validator: validatePhoneNumber, trigger: 'blur' }
  ],
  password: [
    { required: true, validator: validatePassword, trigger: 'blur' }
  ],
  address: [
    { required: true, message: 'Vui lòng nhập địa chỉ', trigger: 'blur' },
    { max: 200, message: 'Địa chỉ không được quá 200 ký tự', trigger: 'blur' }
  ]
}

const handleRegister = async () => {
  if (!formRef.value) return

  try {
    loading.value = true
    await formRef.value.validate()

    const registerData = {
      full_name: form.value.full_name.trim(),
      email: form.value.email.trim().toLowerCase(),
      phone_number: form.value.phone_number.trim(),
      password: form.value.password,
      address: form.value.address.trim(),
      date_of_birth: form.value.date_of_birth || null
    }

    console.log('Sending registration data:', registerData)

    await authService.register(registerData)
    ElMessage({
      type: 'success',
      message: 'Đăng ký thành công! Vui lòng đăng nhập.',
      duration: 3000
    })
    router.push('/login')
  } catch (error: any) {
    console.error('Đăng ký thất bại:', error)

    let errorMessage = 'Đăng ký thất bại'
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message
    } else if (error.message) {
      errorMessage = error.message
    }

    ElMessage({
      type: 'error',
      message: errorMessage,
      duration: 5000
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f7fa;
}

.register-form {
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
  font-size: 24px;
  font-weight: 600;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  width: 100%;
  margin-bottom: 10px;
  height: 40px;
  font-size: 16px;
}

.el-button + .el-button {
  margin-left: 0;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #606266;
}

:deep(.el-input__inner) {
  height: 40px;
}

:deep(.el-textarea__inner) {
  min-height: 80px;
}

:deep(.el-date-editor.el-input) {
  width: 100%;
}

@media (max-width: 768px) {
  .register-form {
    padding: 20px;
  }

  .el-form-item {
    margin-bottom: 15px;
  }
}
</style>