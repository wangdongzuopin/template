import {
    getlocal,
  } from '@/until/auth'
  
const wchat = getlocal('Wechat_UserInfo')
export const Defaultuser = {
    branch_name: "",
    city: "",
    id: '',
    mailbox: "",
    openid: wchat.openid,
    pharmacy_brand: "",
    phone_number: "",
    province: "",
    username: wchat.nickname,
    // "country": "",
    // "province": "",
    // "city": "",
    // "openid": "",
    // "sex": 0,
    // "nickname": "",
    // "headimgurl": "",
    // "language": "",
    // "privilege": []
}