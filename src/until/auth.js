import Vue from 'vue'

export function getToken() {
  return Vue.ls.get('token')
}
export function setToken(token) {
  return Vue.ls.set('token', token)
}
export function removeToken() {
  return Vue.ls.remove('token')
}

export function getCode() {
  return Vue.ls.get('wechat_code')
}
export function setCode(data) {
  return Vue.ls.set('wechat_code',data)
}
export function removeCode() {
  return Vue.ls.remove('wechat_code')
}


// 自定义 返回数组
export function getlcoal(key) {
  if(Vue.ls.get(key)){
    return JSON.parse(Vue.ls.get(key))
  }
  return Vue.ls.get(key) || []
}
export function setlcoal(key,data) {
  return Vue.ls.set(key,JSON.stringify(data))
}
export function removelcoal(key) {
  return Vue.ls.remove(key)
}

export function getUsercode() {
  return localStorage.getItem('usercode')
}

export function setUsercode(usercode) {
  return localStorage.getItem('usercode', usercode)
}