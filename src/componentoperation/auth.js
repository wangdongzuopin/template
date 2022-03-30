import Cookies from 'js-cookie'

export function getOpenid() {
  return Cookies.get('openid')
}

export function setOpenid(openid) {
  return Cookies.set('openid', openid)
}

export function getUsercode() {
  return Cookies.get('usercode')
}

export function setUsercode(usercode) {
  return Cookies.set('usercode', usercode,{ expires: 9999 })
}

