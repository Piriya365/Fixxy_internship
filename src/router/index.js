import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Shop from '../components/Shop.vue'
import Cart from '../components/Cart.vue'
import About from '../components/About.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Orders from '../components/Orders.vue'
import AdminDashboard from '../components/Admin/Dashboard.vue'
import { getCurrentUser, getUserRole } from '../auth'

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
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Sign In | FIXXY MOTORSERVICE' }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { title: 'Sign Up | FIXXY MOTORSERVICE' }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: { title: 'Order History | FIXXY MOTORSERVICE', requiresAuth: true }
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { title: 'Admin Console | FIXXY MOTORSERVICE', requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  }
})

// Navigation Guard to dynamically change browser tab title and check authorization
router.beforeEach(async (to, from, next) => {
  try {
    document.title = to.meta.title || 'FIXXY MOTORSERVICE'
    
    const user = await getCurrentUser()

    // For Admin role, configure the landing page to be the Admin Panel
    if (to.path === '/' && user) {
      const role = await getUserRole(user)
      if (role === 'admin') {
        next({ name: 'AdminDashboard' })
        return
      }
    }
    
    if (to.matched.some(record => record.meta.requiresAdmin)) {
      if (!user) {
        next({ name: 'Login' })
        return
      }
      const role = await getUserRole(user)
      if (role !== 'admin') {
        alert('Access Denied: Administrator privileges required.')
        next({ name: 'Home' })
        return
      } else {
        next()
        return
      }
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!user) {
        next({ name: 'Login' })
        return
      } else {
        next()
        return
      }
    } else {
      next()
      return
    }
  } catch (error) {
    console.error('Error in navigation guard:', error)
    next()
  }
})

export default router

