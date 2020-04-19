import request from '@/utils/request'
const api_name = '/statistics'

export default {
    showChart(searchObj) {
        return request({
            url: `${api_name}/daily/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
            method: 'get'
        })
    }
}