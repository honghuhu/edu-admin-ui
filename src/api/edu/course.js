import request from '@/utils/request'

export default {
    save(params) {
        return request({
            url: '/lecturer/course/save',
            method: 'post',
            data: params
        })
    },
    update(params) {
        return request({
            url: `/lecturer/course/modify/${params.id}`,
            method: 'post',
            data: params
        })
    },
    findById(id) {
        return request({
            url: `/lecturer/course/${id}`,
            method: 'get'
        })
    },
    findCoursePublishVoById(id) {
        return request({
            url: `/lecturer/course/publish/${id}`,
            method: 'get'
        })
    },
    publish(id) {
        return request({
            url: `/lecturer/course/publish/${id}`,
            method: 'post'
        })
    },
    page(data) {
        return request({
            url: `/lecturer/course/page`,
            method: 'post',
            data: data
        })
    },
    delete(id) {
        return request({
            url: `/lecturer/course/${id}`,
            method: 'delete'
        })
    }
}