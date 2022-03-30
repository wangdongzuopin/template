import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(Router)
NProgress.configure({ showSpinner: false });
const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return {
      x: 0,
      y: 0
    } 
  },
  routes: [{
      path: '/',
      name: 'home',
      component: () => import('@/views/home'),
      meta: {
        index: 1,
        title: '首页',
        showFooter: true,
        keepAlive: true
      },
    },
    {
      path: '/404',
      component: () => import('@/views/error-page/404'),
      hidden: true
    },
      // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
  ]
})
// 路由守卫，定义全局load
router.beforeEach((to, from, next) => {
  NProgress.start()
  document.title = to.meta.title
  // 获取当前token
  next();
})
router.afterEach((to) => {
  NProgress.done()
  const hasToken = getToken()
  if (!hasToken) {
    // 设置当前弹出框展示
    // wxcomponents.wchatscope()
    store.commit('SETISPOPUP', true)
  }
  console.log(document.referrer);
})

// 解决路由通过导航保护出现的报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}



export default router