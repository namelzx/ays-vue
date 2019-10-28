import request from '@/utils/request'

export function getWechat (id) {
  return request({
    url: 'api/home/user/getUserByinfo',
    method: 'get',
    params: { id }
  })
}
