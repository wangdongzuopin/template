import Vue from 'vue'
import Vuex from 'vuex'
import position from '@/componentoperation/positionId'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    position, //位置id列表
    token: '',
    theFirstLink: '',
    Wechat: '',
  },
  getters: {
  },
  mutations: {
    
  },
  actions: {
    
  }
})