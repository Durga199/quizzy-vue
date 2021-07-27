import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import signup from '../views/signup.vue'
import login from '../views/login.vue'
import category from '../views/category.vue'
import instruction from '../views/instruction.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/instruction',
    name: 'instruction',
    component: instruction,
    meta:{
      requireLogin: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component:login
  },
  {
    path: '/category',
    name: 'category',
    component:category,
    meta:{
      requireLogin: true
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },
 
  {
    path: '/dashboard/:id',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/dashboard.vue'),
    meta:{
      requireLogin: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
export default router
