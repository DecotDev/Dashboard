import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';


const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/negocio'
  },
  {
    path: '/negocio',
    component: () => import ('../views/NegocioPage.vue')
  },
  {
    path: '/tecnico',
    component: () => import ('../views/TecnicoPage.vue')
  },
  {
    path: '/kpis',
    component: () => import ('../views/KpiPage.vue')
  },
  {
    path: '/tab1',
    component: () => import('../views/Tab1Page.vue')
  },
  {
    path: '/tab2',
    component: () => import('../views/Tab2Page.vue')
  },
  {
    path: '/tab3',
    component: () => import('../views/Tab3Page.vue')
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router