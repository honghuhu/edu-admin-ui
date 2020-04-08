import request from '@/utils/request'

export default {
    saveOrUpdate(data) {
        return request({
            url: '/video/saveOrUpdate',
            method: 'post',
            data: data
        })
    },
    remove(id) {
        return request({
            url: `/video/${id}`,
            method: 'delete'
        })
    },
    info(id) {
        return request({
            url: `/video/${id}`,
            method: 'get'
        })
    }
}