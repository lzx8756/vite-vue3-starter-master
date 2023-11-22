import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Vuex from '@/views/Vuex.vue'
import Test from '@/views/Test.vue'
import Threejs from '@/views/Threejs.vue'
import Cesiumjs from '@/views/Cesiumjs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vuex',
    name: 'Vuex',
    component: Vuex
  },
  {
    path: '/axios',
    name: 'Axios',
    component: () => import('@/views/Axios.vue') // 懒加载 Axios 组件
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
  {
    path: '/threejs',
    name: 'Threejs',
    component: Threejs
  },
  {
    path: '/cesiumjs',
    name: 'Cesiumjs',
    component: Cesiumjs
  }
]

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
