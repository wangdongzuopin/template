import Vue from 'vue'
import Router from 'vue-router'
import store from './store'
import Home from './views/jida/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import wxcomponents from '@/componentoperation/wauth2'
import {
  getToken
} from '@/until/auth' // get token from cookie
Vue.use(Router)

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) { // 如果savedPosition存在，滚动条会自动跳到记录的值的地方
      return savedPosition
    }
    return {
      x: 0,
      y: 0
    } // savedPosition也是一个记录x轴和y轴位置的对象
  },
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        index: 1,
        title: '首页',
        showFooter: true,
        keepAlive: true
      },
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('./views/jida/my'),
      meta: {
        index: 2,
        title: '个人中心',
        showFooter: true,
        keepAlive: false
      },
    },
    {
      path: '/mycenter',
      name: 'mycenter',
      component: () => import('./views/jida/my/mycenter'),
      meta: {
        index: 21,
        title: '编辑资料',
        showFooter: false,
      },
    },
    {
      path: '/myfeedback',
      name: 'myFeedback',
      component: () => import('./views/jida/my/myFeedback'),
      meta: {
        index: 22,
        title: '意见反馈',
        showFooter: false,
      },
    },
    {
      path: '/famous/:id',
      name: 'famous',
      component: () => import('./views/jida/index/famous'),
      meta: {
        index: 3,
        title: '首页'
      },
    },
    {
      path: '/Statement',
      name: 'Statement',
      component: () => import('./views/User/login/Statement'),
      meta: {
        index: 5,
        title: '隐私声明'
      },
    },
    {
      path: '/realinfo',
      name: 'realinfo',
      component: () => import('./views/jida/tab/realinfo'),
      meta: {
        index: 5,
        title: '最新资讯',
        showFooter: false,
      },
    },
    {
      path: '/Forum',
      name: 'Forum',
      component: () => import('./views/jida/tab/Forum'),
      meta: {
        index: 5,
        title: '名医大讲堂',
        showFooter: false,
      },
    },
    {
      path: '/gastation',
      name: 'gastation',
      component: () => import('./views/jida/tab/gastation'),
      meta: {
        index: 5,
        title: '知识加油站',
        showFooter: false,
      },
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import('./views/jida/tab/activity'),
      meta: {
        index: 5,
        title: '活动专区',
        showFooter: false,
      },
    },
    {
      path: '/articledetails',
      name: 'articledetails',
      component: () => import('./views/jida/index/articledetails'),
      meta: {
        index: 5,
        title: '文章详情',
        showFooter: false,
      },
    },
    {
      path: '/search',
      name: 'Search',
      component: () => import('./views/jida/index/search'),
      meta: {
        index: 6,
        title: '关键词搜索',
        showFooter: false,
      },
    },
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
})

// 解决路由通过导航保护出现的报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}



export default router