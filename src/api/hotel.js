import request from '@/utils/request'

export function getBasetype () {
  return request({
    url: '/hotel/getRoombyList',
    method: 'get'
  })
}

export function Demand_Push (data) {
  return request({
    url: 'hotel/Demand_Push',
    method: 'post',
    data
  })
}
export function GetBisPush (data) {
  return request({
    url: 'hotel/GetBisPush',
    method: 'post',
    data
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
