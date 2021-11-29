import axios from 'axios'
import QS from 'qs'
import url from './base'
import { message } from 'element-ui'
const service = axios.create({
    baseURL: url
});
const key = 'updatable';

// 请求超时时间
// post请求头
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// 设置公共url
// 添加请求拦截器
service.interceptors.request.use(function (config) {
    console.log(config);
    // setdevlp(config)
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    console.log(error);
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    console.log(response);
    closemessage()
    if (response.status === 200) {
        return response.data
    }

    // 对响应数据做点什么
    return response;
}, function (error) {
    console.log(error);
    closemessage()
    // 对响应错误做点什么
    return Promise.reject(error);
});

function closemessage() {
    setTimeout(() => {
        message.destroy()
    }, 500);
}
// 设置请求Loading和时间
function setdevlp(config) {
    // 设置Loading
    const { load } = config || false;
    load && message.loading({ content: 'Loading...', key, duration: 0 });

    const { time } = config || 0
    service.defaults.timeout = time * 10;

}

export default service