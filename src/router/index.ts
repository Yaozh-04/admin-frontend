import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/',
    component: () => import('@/views/Layout.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: '数据看板', icon: 'Odometer' }
      },
      {
        path: 'users',
        name: 'UserPanel',
        component: () => import('@/views/UserPanel.vue'),
        meta: { title: '学生信用管理', icon: 'User' }
      },
      {
        path: 'reservations',
        name: 'ReservationFlow',
        component: () => import('@/views/ReservationFlow.vue'),
        meta: { title: '订单流水监控', icon: 'Document' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

// 路由守卫：校验是否持有 Token
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('adminToken')
  if (to.path !== '/login' && !token) {
    next('/login')
  } else if (to.path === '/login' && token) {
    next('/')
  } else {
    next()
  }
})

export default router
