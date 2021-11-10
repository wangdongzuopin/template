import axios from 'axios'
import url from './base'
import service from './request'
// import QS from 'qs'

const A = {
    eggDemo() {
        // return axios.get(`${url}/ads/CKYD62QM.json?segment=placement:vuejsorg`);
        return service.request({
            method:'get',
            url:`${url}/ads/CKYD62QM.json?segment=placement:vuejsorg`,
            load:true,
            time:1000
          })
    }
}

export default A;