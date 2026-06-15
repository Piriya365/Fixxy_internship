import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Shop from '../components/Shop.vue'
import Cart from '../components/Cart.vue'
import About from '../components/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Home | FIXXY MOTORSERVICE' }
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop,
    meta: { title: 'Shop | FIXXY MOTORSERVICE' }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: { title: 'Cart | FIXXY MOTORSERVICE' }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: 'About Us | FIXXY MOTORSERVICE' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard to dynamically change browser tab title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'FIXXY MOTORSERVICE'
  next()
})

export default router

