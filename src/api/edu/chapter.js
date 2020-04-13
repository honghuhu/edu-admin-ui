import request from '@/utils/request'

export default {
    chapterVideo(courseId) {
        return request({
            url: `/lecturer/chapter/${courseId}`,
            method: 'get',
        })
    },
    saveOrUpdate(data) {
        return request({
            url: '/lecturer/chapter/saveOrUpdate',
            method: 'post',
            data: data
        })
    },
    remove(id) {
        return request({
            url: `/lecturer/chapter/${id}`,
            method: 'delete'
        })
    }
}