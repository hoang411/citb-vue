// src/main.ts
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(ElementPlus)
app.use(router)
app.mount('#app')

// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: () => import('@/views/Home.vue') },
        { path: '/login', component: () => import('@/views/Login.vue') },
        { path: '/register', component: () => import('@/views/Register.vue') },
        {
            path: '/admin',
            component: () => import('@/views/admin/AdminLayout.vue'),
            meta: { requiresAuth: true, requiresAdmin: true },
            children: [
                { path: 'products', component: () => import('@/views/admin/ProductManagement.vue') },
                { path: 'orders', component: () => import('@/views/admin/OrderManagement.vue') },
                { path: 'users', component: () => import('@/views/admin/UserManagement.vue') },
                { path: 'inventory', component: () => import('@/views/admin/InventoryManagement.vue') },
                { path: 'partners', component: () => import('@/views/admin/PartnerManagement.vue') },
            ]
        },
        { path: '/products/:id', component: () => import('@/views/product/ProductDetail.vue') },
        { path: '/orders', component: () => import('@/views/order/OrderHistory.vue') },
        { path: '/profile', component: () => import('@/views/user/Profile.vue'), meta: { requiresAuth: true } },
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login')
    } else if (to.meta.requiresAdmin && !authStore.isAdmin) {
        next('/')
    } else {
        next()
    }
})

export default router