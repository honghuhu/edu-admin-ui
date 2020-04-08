import request from '@/utils/request'

export default {
    tree() {
        return request({
            url: '/subject/tree',
            method: 'get'
        })
    }
}