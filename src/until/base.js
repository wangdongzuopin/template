/**
 * 开发环境-测试环境-生产环境
 */
import service from "./request";
switch(process.env.NODE_ENV){
    case 'development':
        service.defaults.baseURL = 'http://192.168.0.215:8080/';
    break;

    case 'debug':
        service.defaults.baseURL = 'https://www.baidu.com';
    break;

    case 'production':
        service.defaults.baseURL = 'https://www.baidu.com';
    break;
}
const url = service.defaults.baseURL
export default url