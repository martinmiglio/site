import App from './App.vue'
import './assets/index.css'
import router from './router'
import { createHead } from '@unhead/vue'
import { createApp } from 'vue'

const app = createApp(App)

app.use(router)
app.use(createHead())

router.isReady().then(() => {
  app.mount('#app')
})
