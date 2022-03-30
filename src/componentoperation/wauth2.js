import wx from 'weixin-js-sdk'
import store from '../store'
import axios from 'axios';
import router from '../router';
import {
  Toast
} from 'vant';
import {
  getSignature,getdatauserinfo,getDataCode
} from "@/until/api/wxconfig"
import {
  getCode
} from '@/until/auth'
export default {
  isCode(){
     return window.location.search.includes('code=')
  },
  wchatscope(){
    if(this.isCode()){
      this.getuser()
    }else{
      this.getCode()
    }
  },
  getuser(){
    if(localStorage.getItem('Wechat_UserInfo')){
      return
    }
    const url_params = Object.fromEntries(window.location.search.slice(1).split('&').map( v => v.split('=')))
    store.commit('SETWCHATCODE',url_params.code)
    getdatauserinfo(url_params.code || getCode()).then((res) => {
      debugger
      store.commit('SETUSERINFOWYCHAT',res.data)
    })
  },
  getCode(){
    var url = location.href.split('#')[0]
    // getDataCodee接口获取code值
    getDataCode(url).then((res) => {
      // window.location.href = res.data
    })

    // axios.get('http://localhost:3000/getCode').then((res) => {
    //   if(res.status == 200){
    //   }
    // })
  }
}



