import { createApp } from 'vue'
import './style.sass'
import App from './App.vue'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification';

const app = createApp(App)
app.use(createPinia())
app.use(ToastPlugin)
app.mount('#app')
