import {useAuthStore} from '@/stores/auth'
import router from "./router.ts";

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const requiresGuest = to.matched.some(record => record.meta.requiresGuest)
    const requiredRoles = to.meta.roles as string[] | undefined

    if (requiresAuth && !authStore.isAuthenticated) {
        next('/login')
    } else if (requiresGuest && authStore.isAuthenticated) {
        next('/')
    } else if (requiredRoles && !requiredRoles.includes(authStore.user?.role || '')) {
        next('/')
    } else {
        next()
    }
})

