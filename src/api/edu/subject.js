import request from '@/utils/request'

export default {
    tree() {
        return request({
            url: '/lecturer/subject/tree',
            method: 'get'
        })
    }
}