// src/stores/cart.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { cartService } from '@/services/cart.service'
import type { Cart, CartItem } from '@/interfaces/cart.interface'

export const useCartStore = defineStore('cart', () => {
    const cart = ref<Cart>({
        items: [],
        total_amount: 0
    })
    const loading = ref(false)

    const itemCount = computed(() => cart.value.items.length)
    const totalAmount = computed(() => cart.value.total_amount)

    async function fetchCart() {
        loading.value = true
        try {
            const response = await cartService.getCart()
            cart.value = response.data
        } finally {
            loading.value = false
        }
    }

    async function addToCart(productId: number, quantity: number) {
        const response = await cartService.addToCart(productId, quantity)
        cart.value = response.data
    }

    async function updateCartItem(itemId: number, quantity: number) {
        const response = await cartService.updateCartItem(itemId, quantity)
        cart.value = response.data
    }

    async function removeFromCart(itemId: number) {
        await cartService.removeFromCart(itemId)
        cart.value.items = cart.value.items.filter(item => item.id !== itemId)
        calculateTotal()
    }

    async function clearCart() {
        await cartService.clearCart()
        cart.value = {
            items: [],
            total_amount: 0
        }
    }

    function calculateTotal() {
        cart.value.total_amount = cart.value.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        )
    }

    return {
        cart,
        loading,
        itemCount,
        totalAmount,
        fetchCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart
    }
})