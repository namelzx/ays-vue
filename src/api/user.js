import request from '@/utils/request'

export function getUserbyCertification (user_id) {
  return request({
    url: '/user/getUserbyCertification',
    method: 'get',
    params: { user_id }
  })
}
export function getLogin (data) {
  return request({
    url: '/user/login',
    method: 'post',
    // params: { phone ,id}
    data
  })
}
export function setUserbyInfo (data) {
  return request({
    url: '/user/setUserbyInfo',
    method: 'post',
    data
  })
}
export function UserbyInfo (id) {
  return request({
    url: '/user/UserbyInfo',
    method: 'get',
    params: { id }
  })
}
export function PostCertification (data) {
  return request({
    url: '/user/setbyCertification',
    method: 'post',
    data
  })
}

export function setHotelUserbyCertification (data) {
  return request({
    url: '/user/setbyHotelCertification',
    method: 'post',
    data
  })
}
export function gethotelbyCertification (user_id) {
  return request({
    url: '/user/gethotelbyCertification',
    method: 'get',
    params: { user_id }
  })
}
