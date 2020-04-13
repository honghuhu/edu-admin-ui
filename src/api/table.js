import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/lecturer/table/list',
    method: 'get',
    params
  })
}
