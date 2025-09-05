import BioView from '@/views/BioView.vue'
import CVView from '@/views/CVView.vue'
import HomeView from '@/views/ParentView.vue'
import EmptyView from '@/views/EmptyView.vue'

export const routes = [
  {
    path: '/',
    component: HomeView,
    children: [
      {
        path: '',
        name: '',
        component: EmptyView
      },
      {
        path: 'about', 
        name: 'about',
        component: BioView,
        inHeader: true
      },
      {
        path: 'cv',
        name: 'cv',
        component: CVView,
        inHeader: true
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue')
  }
]
