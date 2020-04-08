import request from '@/utils/request'

export default {
    page(params) {
        return request({
            url: '/teacher/page',
            method: 'post',
            data: params
        })
    },
    all() {
        return request({
            url: '/teacher/all',
            method: 'get'
        })
    },
    save(params) {
        return request({
            url: '/teacher/save',
            method: 'post',
            data: params
        })
    },
    delete(id) {
        return request({
            url: `/teacher/${id}`,
            method: 'delete'
        })
    },
    update(params){
        return request({
            url: `/teacher/modify/${params.id}`,
            method: 'post',
            data: params
        })
    }
}