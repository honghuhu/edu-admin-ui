import request from '@/utils/request'

export default {
    save(data) {
        return request({
            url: '/lecturer/course/save',
            method: 'post',
            data
        })
    },
    update(data) {
        return request({
            url: `/lecturer/course/modify/${data.id}`,
            method: 'post',
            data
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
            data
        })
    },
    delete(id) {
        return request({
            url: `/lecturer/course/${id}`,
            method: 'delete'
        })
    }
}