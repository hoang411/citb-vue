import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/views/Home.vue')
        },
        {
            path: '/login',
            component: () => import('@/views/Login.vue'),
            meta: { requiresGuest: true }
        },
        {
            path: '/admin',
            component: () => import('@/views/admin/AdminLayout.vue'),
            meta: { requiresAuth: true, roles: ['ADMIN'] },
            children: [
                {
                    path: 'products',
                    component: () => import('@/views/admin/ProductManagement.vue')
                }
                // ... other admin routes
            ]
        },
        {
            path: '/warehouse',
            component: () => import('@/views/warehouse/WarehouseLayout.vue'),
            meta: { requiresAuth: true, roles: ['WAREHOUSE'] },
            children: [
                {
                    path: 'inventory',
                    component: () => import('@/views/warehouse/InventoryCheck.vue')
                }
                // ... other warehouse routes
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
    const requiredRoles = to.meta.roles as string[] | undefined

    if (requiresAuth && !authStore.isAuthenticated) {
        next('/login')
        return
    }

    if (requiresGuest && authStore.isAuthenticated) {
        next('/')
        return
    }

    if (requiredRoles && !requiredRoles.includes(authStore.userRole)) {
        next('/')
        return
    }

    next()
})

export default router