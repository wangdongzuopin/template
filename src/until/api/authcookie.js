import Cookies from 'js-cookie'

const TokenKey = 'openid'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}