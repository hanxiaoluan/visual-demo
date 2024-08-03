import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home.vue'
import TableView from '../views/table/index.vue'
import Lexical from '../views/lexical'
import TinymceView from '../views/tinymce/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/table',
      name: 'table',
      component: TableView
    },
    {
      path: '/lexical',
      name: 'lexical',
      component: Lexical
    },
    {
      path: '/tinymce',
      name: 'tinymce',
      component: TinymceView
    }
  ]
})

export default router
