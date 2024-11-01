// src/components/cart/CartView.vue
<template>
  <div class="cart-view">
    <h2>Giỏ hàng</h2>

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
      <el-table :data="cartStore.cart.items" border>
        <el-table-column label="Sản phẩm" width="400">
          <template #default="{ row }">
            <div class="product-info">
              <el-image
                  :src="row.image"
                  fit="cover"
                  :preview-src-list="[row.image]"
                  class="product-image"
              />
              <div class="product-details">
                <h4>{{ row.product_name }}</h4>
                <p class="price">{{ formatPrice(row.price) }}</p>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Số lượng" width="200">
          <template #default="{ row }">
            <el-input-number
                v-model="row.quantity"
                :min="1"
                :max="99"
                @change="(value) => handleQuantityChange(row.id, value)"
            />
          </template>
        </el-table-column>

        <el-table-column label="Thành tiền">
          <template #default="{ row }">
            {{ formatPrice(row.price * row.quantity) }}
          </template>
        </el-table-column>

        <el-table-column label="Thao tác" width="120">
          <template #default="{ row }">
            <el-button
                type="danger"
                size="small"
                @click="handleRemoveItem(row.id)"
            >
              Xóa
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="cart-summary">
        <div class="total-amount">
          Tổng tiền: <span>{{ formatPrice(cartStore.totalAmount) }}</span>
        </div>
        <div class="actions">
          <el-button @click="$router.push('/products')">
            Tiếp tục mua sắm
          </el-button>
          <el-button type="primary" @click="handleCheckout">
            Thanh toán
          </el-button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { ElMessageBox } from 'element-plus'
import { formatPrice } from '@/utils/formatters'

const router = useRouter()
const cartStore = useCartStore()

onMounted(() => {
  cartStore.fetchCart()
})

async function handleQuantityChange(itemId: number, quantity: number) {
  try {
    await cartStore.updateCartItem(itemId, quantity)
  } catch (error) {
    console.error('Failed to update quantity:', error)
  }
}

async function handleRemoveItem(itemId: number) {
  try {
    await ElMessageBox.confirm(
        'Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?',
        'Xác nhận xóa',
        {
          confirmButtonText: 'Xóa',
          cancelButtonText: 'Hủy',
          type: 'warning'
        }
    )
    await cartStore.removeFromCart(itemId)
  } catch (error) {
    if (error !== 'cancel') {
      console.error('Failed to remove item:', error)
    }
  }
}

function handleCheckout() {
  router.push('/checkout')
}
</script>

<style scoped>
.cart-view {
  padding: 20px;
}

.product-info {
  display: flex;
  align-items : center;
}

.product-image {
  width: 80px;
  height: 80px;
  margin-right: 10px;
}

.product-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.price {
  font-weight: bold;
}

.cart-summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.total-amount {
  font-size: 18px;
  font-weight: bold;
}

.total-amount span {
  color: #f56c6c;
}

.actions {
  display: flex;
  gap: 10px;
}
</style>