import axios from 'axios'
import url from './base'
import service from './request'
// import QS from 'qs'

const A = {
    getSignature(data) {
        return service.request({
            method:'get',
            url:`${url}getSignature?urlStr=`+data,
            load:true,
            time:1000
          })
    }
}

export default A;