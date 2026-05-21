import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './styles/main.css'
import router from './router'  // ← роутер уже есть в router/index.js, не дублируй


const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')