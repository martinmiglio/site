import BioView from '@/views/BioView.vue'
import CVView from '@/views/CVView.vue'
import HomeView from '@/views/HomeView.vue'

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
    path: '/about',
    name: 'About',
    component: BioView,
    inHeader: true
  },
  {
    path: '/cv',
    name: 'My CV',
    component: CVView,
    inHeader: true
  }
]
