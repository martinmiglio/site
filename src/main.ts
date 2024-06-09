import App from './App.vue'
import './assets/index.css'
import { routes } from './router'
import { ViteSSG } from 'vite-ssg'

export const createApp = ViteSSG(App, { routes })
