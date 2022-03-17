import service from '@/until/request'

// 签名
export function getSignature(data) {
    return service.request({
        method: 'get',
        url: `/getSignature?urlStr=${data}`,
        load: false,
        time: 1000
    })
}

// 授权code
export function getDataCode(url) {
    return service.request({
        method: 'get',
        url: `/getCode?urlstr=${encodeURIComponent(url)}`,
        load: true,
        time: 1000
    })
}

export function getdatauserinfo(data) {
    return service.request({
        method: 'get',
        url: `getuserinfo?code=${data}`,
        load: true,
        time: 1000,
    })
}
