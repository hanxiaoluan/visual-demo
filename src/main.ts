import './assets/main.css'
import 'virtual:uno.css'
import '@/styles/index.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 额外引入图标库
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ArcoVueIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
