import axios from 'axios'
import {
    getToken
} from '@/until/auth'
import {
    Toast,Dialog
} from 'vant';
import store from '@/store'
import router from '../router';

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, 
    // baseURL: 'http://localhost:3000/', 
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000*10 // request timeout
})
// request interceptor
service.interceptors.request.use(
    config => {
        if (config.load) {
            Toast.loading({
                message: '加载中...',
                forbidClick: true,
                loadingType: 'spinner',
            });
        }
        // do something before request is sent
        if (store.getters.token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers['token'] = getToken()
        }
        return config
    },
    error => {
        // do something with request error
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    response => {
        const res = response.data
        setTimeout(() => {
            Toast.clear()
        }, 500);
        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 20000) {
            if (res.code === 50008 || res.code === 50012) {
                Dialog.alert(res.message || '登录已过期，请重新登录', {
                    confirmButtonText: '确认',
                    type: 'warning'
                }).then(() => {
                   router.push({path:'/login'})
                })
            }

            if (res.code === 30000) {
                router.go(-1)
            }
            return Promise.reject(res.message)
        } else {
            return res
        }
    },
    error => {
        if (error.message === 'timeout of 5000ms exceeded') {
            Toast({
                message: '请求数据超时',
                type: 'error',
                duration: 5 * 1000
            })
        } else {
            Toast({
                message: error.message,
                type: 'error',
                duration: 5 * 1000
            })
        }
        setTimeout(() => {
            Toast.clear()
        }, 1000);
        return Promise.reject(error)
    }
)
export default service