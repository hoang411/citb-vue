// src/components/checkout/CheckoutView.vue
<template>
  <div class="checkout-view">
    <h2>Thanh toán</h2>

    <div v-if="cartStore.loading" class="loading">
      <el-skeleton :rows="3" animated />
    </div>

    <div v-else-if="cartStore.itemCount === 0" class="empty-cart">
      <el-empty description="Giỏ hàng trống">
        <el-button type="primary" @click="$router.push('/products')">
          Tiếp tục mua sắm
        </el-button>
      </el-empty>
    </div>

    <template v-else>
      <el-form :model="checkoutForm" @submit.prevent="handleSubmit">
        <el-form-item label="Họ và tên">
          <el-input v-model="checkoutForm.full_name" />
        </el-form-item>

        <el-form-item label="Email">
          <el-input v-model="checkoutForm.email" />
        </el-form-item>

        <el-form-item label="Số điện thoại">
          <el-input v-model="checkoutForm.phone" />
        </el-form-item>

        <el-form-item label="Địa chỉ">
          <el-input v-model="checkoutForm.address" type="textarea" :rows="3" />
        </el-form-item>

        <el-form-item label="Phương thức thanh toán">
          <el-radio-group v-model="checkoutForm.payment_method">
            <el-radio label="COD">Thanh toán khi nhận hàng</el-radio>
            <el-radio label="Bank Transfer">Chuyển khoản ngân hàng</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit">
            Thanh toán
          </el-button>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { handleApiError } from '@/utils/errorHandlers'
import { ElMessage } from 'element-plus'

const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

const checkoutForm = reactive({
  full_name: '',
  email: '',
  phone: '',
  address: '',
  payment_method: 'COD'
})

async function handleSubmit() {
  try {
    const order = await cartService.createOrder({
      user_id: authStore.user?.id,
      items: cartStore.cart .items,
      total_amount: cartStore.totalAmount,
      ...checkoutForm
    })

    ElMessage.success('Đặt hàng thành công')
    cartStore.clearCart()
    router.push(`/orders/${order.id}`)
  } catch (error) {
    handleApiError(error)
  }
}
</script>

<style scoped>
.checkout-view {
  padding: 20px;
}
</style>