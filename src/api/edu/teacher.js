import request from '@/utils/request'

export default {
    page(data) {
        return request({
            url: '/lecturer/teacher/page',
            method: 'post',
            data
        })
    },
    all() {
        return request({
            url: '/lecturer/teacher/all',
            method: 'get'
        })
    },
    save(data) {
        return request({
            url: '/lecturer/teacher/save',
            method: 'post',
            data
        })
    },
    delete(id) {
        return request({
            url: `/lecturer/teacher/${id}`,
            method: 'delete'
        })
    },
    update(data) {
        return request({
            url: `/lecturer/teacher/modify/${data.id}`,
            method: 'post',
            data
        })
    }
}