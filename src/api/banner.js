import request from '@/utils/request'

export function GetBannerByList (params) {
  return request({
    url: '/Banner',
    method: 'get',
    params
  })
}

export function GetBgByFind(params) {
    return request({
      url: '/bg',
      method: 'get',
      params
    })
  }

export function postHotelDemandByData (data) {
  return request({
    url: '/hotel/postHotelDemandByData',
    method: 'post',
    data
  })
}
export function getHotelRoomByInfo (params) {
  return request({
    url: '/hotel/getHotelRoomByInfo',
    method: 'get',
    params
  })
}
export function getRoomByInfo (id) {
  return request({
    url: '/hotel/getRoomByInfo',
    method: 'get',
    params: { id }
  })
}
export function getHotelBylist (data) {
  return request({
    url: '/hotel/getHotelBylist',
    method: 'post',
    data
    // params: {query}
  })
}
export function postRoomOrderByData (data) {
  return request({
    url: '/hotel/postRoomOrderByData',
    method: 'post',
    data
  })
}
