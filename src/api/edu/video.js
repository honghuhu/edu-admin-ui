import request from '@/utils/request'

export default {
    saveOrUpdate(data) {
        return request({
            url: '/lecturer/video/saveOrUpdate',
            method: 'post',
            data
        })
    },
    remove(id) {
        return request({
            url: `/lecturer/video/${id}`,
            method: 'delete'
        })
    },
    info(id) {
        return request({
            url: `/lecturer/video/${id}`,
            method: 'get'
        })
    }
}