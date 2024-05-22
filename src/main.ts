import App from './App.vue'
import './assets/index.css'
import router from './router'
import { createApp } from 'vue'
import { createMetaManager } from 'vue-meta'

const app = createApp(App)

app.use(router)
app.use(createMetaManager())

await router.isReady()
app.mount('#app')
