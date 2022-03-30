import service from '@/until/request'
// import QS from 'qs'

export function getpositionData(params) {
    return service.request({
        method: 'get',
        url: `/f/pc/list`,
        load: false,
        params
    })
}

export function getarticledetail(params) {
    return service.request({
        method: 'get',
        url: `/f/positionContent/detail`,
        load: true,
        params
    })
}
// 点击收藏功能
export function addCollection(params) {
    return service.request({
        method: 'get',
        url: `/f/addCollection`,
        load: false,
        params
    })
}
// 取消收藏功能
export function delCollection(params) {
    return service.request({
        method: 'get',
        url: `/f/delCollection`,
        load: false,
        params
    })
}

// 点赞功能
export function addLike(params) {
    return service.request({
        method: 'get',
        url: `/f/addLike`,
        load: false,
        params
    })
}
// 取消点赞功能
export function delLike(params) {
    return service.request({
        method: 'get',
        url: `/f/delLike`,
        load: false,
        params
    })
}
// 查看所有评论
export function commentList(params) {
    return service.request({
        method: 'get',
        url: `/f/comment`,
        load: false,
        params
    })
}

export function getPositionContent(params) {
    return service.request({
        method: 'get',
        url: `/f/getPositionContent`,
        load: false,
        params
    })
}

export function getArticle(params) {
    return service.request({
        method: 'get',
        url: `/f/getArticle`,
        load: false,
        params
    })
}





// 添加评论
export function addCommentById(data) {
    return service.request({
        method: 'post',
        url: `/f/addCommentById`,
        load: false,
        data
    })
}

// 根据openid获取所有收藏
export function getCollectionList(params) {
    return service.request({
        method: 'get',
        url: `/f/getCollectionList`,
        load: false,
        params
    })
}

// 根据openid获取所有收藏
export function saveVideoDuration(data) {
    return service.request({
        method: 'post',
        url: `/f/saveVideoDuration`,
        load: false,
        data
    })
}