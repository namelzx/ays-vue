import request from '@/utils/request'

export function PostUpdate (data) {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}
