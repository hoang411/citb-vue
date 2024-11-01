import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index' // Sửa đường dẫn import

const app = createApp(App)

// Thứ tự use quan trọng: Pinia trước, router sau
app.use(createPinia())
app.use(ElementPlus)
app.use(router)

app.mount('#app')