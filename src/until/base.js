/**
 * 开发环境-测试环境-生产环境
 */
 import service from "./request";
 switch(process.env.NODE_ENV){
     case 'development':
         // service.defaults.baseURL = 'http://192.168.1.215:8099/';
         service.defaults.baseURL = 'http://miniapp.unithought.com:8099/';
        //  service.defaults.baseURL = 'http://49.233.60.168:8099/';
     break;
 
     case 'debug':
         service.defaults.baseURL = 'http://49.233.60.168:8080/';
     break;
 
     case 'production':
         service.defaults.baseURL = 'http://miniapp.unithought.com:8099/';
         // service.defaults.baseURL = 'http://49.233.60.168:8080/';
     break;
 }
 const url = service.defaults.baseURL
 export default url