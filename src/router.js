import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Two from './views/two.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'about',
    //   component: () => import('./views/About.vue')
    // },
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        index: 8,
      },
    },
    {
      path: '/two',
      name: 'two',
      component: Two,
      meta: {
        index: 9,
      },
    },
    {
      path: '/three',
      name: 'three',
      component: () => import('./views/three.vue')
    },
    {
      path: '/four',
      name: 'four',
      component: () => import('./views/four.vue')
    },
    {
      path: '/five',
      name: 'five',
      component: () => import('./views/five.vue')
    },
    {
      path: '/schedule',
      name: 'six',
      component: () => import('./views/Meeting/schedule.vue')
    },
    {
      path: '/phone',
      name: 'phone',
      component: () => import('./views/phone.vue')
    },
  ],
  scrollBehavior (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})
// 路由守卫，定义全局load
router.beforeEach((to,from,next)=>{
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})


export default router