/**
 * 开发环境-测试环境-生产环境
 */
import service from "./request";
switch(process.env.NODE_ENV){
    case 'development':
        service.defaults.baseURL = 'https://srv.buysellads.com';
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