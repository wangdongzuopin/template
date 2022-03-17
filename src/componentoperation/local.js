/*
       * 参数说明：
       * method：get获取，set存入或覆盖，clean清除
       * name:localStorage的名称
       * obj:存入的内容，可以是任意类型
       * localStorage.getItem(key):获取指定key本地存储的值
       * localStorage.setItem(key,value)：将value存储到key字段
       * localStorage.removeItem(key):删除指定key本地存储的值
       * */

// const localData = function (method, name, data) {
//     switch (method) {
//         case 'get':
//             return JSON.parse(localStorage.getItem(name))
//         case 'set':
//             if(data instanceof Object){
//                 localStorage.setItem(name,JSON.stringify(data))
//                 return
//             }
//             localStorage.setItem(name,data)
//         case 'clear':
//             localStorage.removeItem(name)
//         case 'clearall':
//             localStorage.clear()
//             return
//     }
// }
const localData = {
    get(name) {
        if(JSON.parse(localStorage.getItem(name))) return JSON.parse(localStorage.getItem(name))
        return ''
    },
    set (name,data) {
        if (data instanceof Object) {
            localStorage.setItem(name, JSON.stringify(data))
            return
        }
        localStorage.setItem(name, data)
    },
    clear(name){
        name? localStorage.removeItem(name):''
    }
}
export default localData