import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/arvolleyball',
      name: 'Arvolleyball',
      component: () => import('../views/ArvolleyballView.vue')
    },
    {
      path: '/artennis',
      name: 'Artennis',
      component: () => import('../views/ArtennisView.vue')
    },
    {
      path: '/stackattack',
      name: 'Stackattack',
      component: () => import('../views/Stackattack.vue')
    }
  ]
})

export default router
