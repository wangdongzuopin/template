import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
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
      path: '/game',
      name: 'game',
      component: () => import('./views/pages/game.vue')
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