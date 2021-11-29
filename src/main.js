import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store from './store'
import localData from './componentoperation/local'
import A from './until/api'
import './registerServiceWorker'
import ElementUI from 'element-ui';
import Storage from 'vue-ls';
import animated from 'animate.css' // npm install animate.css --save安装，在引入
import "./assets/css/index.less"
import 'babel-polyfill'
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css/normalize.css'
// import '../utils/rem.js'
// Toast
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
Vue.use(Toast);

Vue.use(ElementUI);
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
