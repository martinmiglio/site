import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    inHeader: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue')
  },
  {
    path: '/cv',
    name: 'My CV',
    component: () => import('@/views/CVView.vue'),
    inHeader: true
  }
  // {
  //   path: '/message',
  //   name: 'Message Me',
  //   component: () => import('@/views/MessageView.vue'),
  //   inHeader: true
  // }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
