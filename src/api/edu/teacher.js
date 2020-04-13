import request from '@/utils/request'

export default {
    page(params) {
        return request({
            url: '/lecturer/teacher/page',
            method: 'post',
            data: params
        })
    },
    all() {
        return request({
            url: '/lecturer/teacher/all',
            method: 'get'
        })
    },
    save(params) {
        return request({
            url: '/lecturer/teacher/save',
            method: 'post',
            data: params
        })
    },
    delete(id) {
        return request({
            url: `/lecturer/teacher/${id}`,
            method: 'delete'
        })
    },
    update(params){
        return request({
            url: `/lecturer/teacher/modify/${params.id}`,
            method: 'post',
            data: params
        })
    }
}