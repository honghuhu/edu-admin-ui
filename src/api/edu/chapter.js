import request from '@/utils/request'

export default {
    chapterVideo(courseId) {
        return request({
            url: `/chapter/${courseId}`,
            method: 'get',
        })
    },
    saveOrUpdate(data) {
        return request({
            url: '/chapter/saveOrUpdate',
            method: 'post',
            data: data
        })
    },
    remove(id) {
        return request({
            url: `/chapter/${id}`,
            method: 'delete'
        })
    }
}