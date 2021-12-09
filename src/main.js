import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import localData from './componentoperation/local'
import A from './until/api'
import './registerServiceWorker'
import Storage from 'vue-ls';
import animated from 'animate.css' // npm install animate.css --save安装，在引入
import "./assets/css/index.less"
import 'babel-polyfill'
import 'normalize.css/normalize.css'
import 'amfe-flexible/index.js'

// 引入的多的话
import { Button, Row, Col } from 'vant'
Vue.use(Button).use(Row).use(Col)
Vue.use(animated)
Vue.config.productionTip = false
Vue.prototype.$local = localData
Vue.prototype.$api = A
const options = {
  namespace: '', // key键前缀
  name: 'ls', // 命名Vue变量.[ls]或this.[$ls],
  storage: 'local', // 存储名称: session, local, memory
};
 
Vue.use(Storage, options);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
