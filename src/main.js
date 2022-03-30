import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Storage from 'vue-ls';
import animated from 'animate.css' // npm install animate.css --save安装，在引入
import 'babel-polyfill'
import 'normalize.css/normalize.css'
import 'amfe-flexible/index.js'
import '@/assets/css/index.scss'
import moment from 'moment' //导入文件
import {
  imgsPreloader
} from './componentoperation/imgPreloader';
import imgPreloaderList from './componentoperation/imgPreloaderList';
// 引入的多的话
import {
  Button,
  Toast,
  Image as VanImage,
  Field,
  Sticky,
  NavBar,
  Icon,
  Tab,
  Tabs,
  Area,
  Loading,
  Swipe,
  SwipeItem,
  Skeleton,
  CountDown,
  ImagePreview,
  Overlay,
  List,
  Checkbox,
  CheckboxGroup,
  Form,
  Notify,
  Search,
  Tag,
  Popup,
  Cell,
  CellGroup,
  Empty,
  Cascader,
  NoticeBar 
} from 'vant'
Vue.use(Button).use(Loading).use(NoticeBar).use(Toast).use(Overlay).use(ImagePreview).use(Skeleton).use(CountDown).use(Swipe).use(SwipeItem).use(Search).use(Area).use(Cell).use(Cascader).use(Empty).use(CellGroup).use(Tag).use(Popup).use(VanImage).use(Field).use(Sticky).use(NavBar).use(Icon).use(Tab).use(Tabs).use(List).use(Checkbox).use(CheckboxGroup).use(Form).use(Notify)


Vue.prototype.$moment = moment; //赋值使用
// 设置避免重复点击
import {
  preventReClick
} from '@/until/common'
Vue.use(preventReClick)
Toast.setDefaultOptions('loading', {
  forbidClick: true
});


Vue.use(animated)
Vue.config.productionTip = false
const options = {
  namespace: '', // key键前缀
  name: 'ls', // 命名Vue变量.[ls]或this.[$ls],
  storage: 'local', // 存储名称: session, local, memory
};
Vue.use(Storage, options);

// 开发环境下面使用vConsole进行调试
// if (process.env.NODE_ENV !== 'production') {
//   const VConsole = require('vconsole')
//   new VConsole()
// }

(async () => {
  if (location.href.indexOf('articledetailsTemp') == -1) {
    document.querySelector('.loading').style.display = 'flex';
  }
  // document.querySelector('.loading').style.display = 'flex';
  await imgsPreloader(imgPreloaderList);
  //关闭加载弹框
  setTimeout(() => {
    document.querySelector('.loading').style.display = 'none';
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');
  }, 1000);

})()