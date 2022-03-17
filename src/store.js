import Vue from 'vue'
import Vuex from 'vuex'
import {
  setToken,
  setCode,
  setlcoal,
} from '@/until/auth'
import wxShare from '@/componentoperation/wxShare'
import {
  getOpenid,
  setOpenid,
  getUsercode,
  setUsercode
} from '@/componentoperation/auth'
import {
  resolve
} from 'core-js/fn/promise'
import {
  UserH5Info,
  getusercodeData
} from '@/until/api/user'
import position from '@/componentoperation/positionId'
// import Defaultuser from "@/componentoperation/user"
Vue.use(Vuex)

function getinfo(lcoalname) {
  var data = localStorage.getItem(lcoalname)
  if (JSON.parse(data) && JSON.parse(data).value) {
    return JSON.parse(JSON.parse(data).value)
  }
  return data || ''
}
export default new Vuex.Store({
  state: {
    admon: 'https://jd.unithought.com',
    position, //位置id列表
    user: getinfo('user'),
    token: '',
    theFirstLink: '',
    Wechat: '',
    ispopupshow: false, //判断当前首页弹出框是否展示
    usercode: getUsercode()
  },
  getters: {
    token: state => state.token,
    userinfo: state => state.user
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SETFIRSTLINK(state, url) {
      state.theFirstLink = url
    },
    SETWCHATCODE(state, code) {
      setCode(code)
    },
    SETUSERINFOWYCHAT(state, data) {
      if (data.openid) {
        setlcoal('Wechat_UserInfo', data)
        state.Wechat = data
      }
    },
    // 首页弹出框
    SETISPOPUP(state, data) {
      state.ispopupshow = data
    },
    SETISPOPUPANDTOKEN(state, data) {
      setToken(new Date().getTime());
      // wxShare.wchatscope()
      state.ispopupshow = data
    },
    SETH5USER(state, data) {
      setlcoal('user', data)
      state.user = data
    },

    // 设置usercode
    SETUSERCODE(state, data) {
      return new Promise((resolve) => {
        setUsercode(data)
        state.usercode = data
        resolve(true)
      })
    }
  },
  actions: {
    getH5user({
      commit,
      state
    }) {
      return new Promise((resolve) => {
        if (!getUsercode()) {
          return
        }
        UserH5Info(getUsercode()).then(res => {
          console.log(res);
          if (res.data) {
            commit('SETH5USER', res.data)
          } else {
            commit('SETH5USER', {})
          }
          resolve(true)
        })
      })
    },
    // 根据当前用户的usercode进行判断
    isUsercode({
      commit,
      state
    }) {
      return new Promise((resolve) => {
        if (!getUsercode()) {
          // 获取usercode
          this.dispatch('vuegetUsercode').then(res => {
            // 设置usercode
            commit('SETUSERCODE', res.data)
            setTimeout(() => {
              this.dispatch('getH5user')
              resolve(true)
            });
          })
        } else {
          state.usercode = getUsercode()
          this.dispatch('getH5user')
          resolve()
        }
      })
    },
    // 获取usercode
    vuegetUsercode() {
      return new Promise(resolve => {
        getusercodeData().then(res => {
          resolve(res)
        })
      })
    }
  }
})