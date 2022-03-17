import service from '@/until/request'
// import QS from 'qs'

export function saveUserInfo(data) {
    return service.request({
        method: 'POST',
        url: `/f/saveUserInfo`,
        load: true,
        data
    })
}
export function updateUserInfo(data) {
    return service.request({
        method: 'POST',
        url: `/f/updateUserInfo`,
        load: true,
        data
    })
}

export function UserH5Info(usercode) {
    var params = {usercode}
    return service.request({
        method: 'get',
        url: `/f/getUserInfo`,
        params,
        load: true,
    })
}

export function savefeedback(data) {
    return service.request({
        method: 'POST',
        url: `/f/savefeedback`,
        load: true,
        data
    })
}

// export function getUserInfo(data) {
//     return service.request({
//         method: 'get',
//         url: `/user/info?token=${data}`,
//         load: false,
//     })
// }

// 获取usercode
export function getusercodeData() {
    return service.request({
        method: 'get',
        url: `/f/getUserCode`,
        load: false,
    })
}