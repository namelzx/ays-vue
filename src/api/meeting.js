import request from '@/utils/request'


export function GetBisPush (data) {
  return request({
    url: 'Meeting/GetBisPush',
    method: 'post',
    data
  })
}

export function postMeetingDemandByData (data) {
  return request({
    url: 'Meeting/postMeetingDemandByData',
    method: 'post',
    data
  })
}
export function getMeetingRoomByInfo (params) {
  return request({
    url: 'Meeting/getMeetingRoomByInfo',
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
export function getMeetingBylist(data) {
  return request({
    url: 'Meeting/getMeetingBylist',
    method: 'post',
    data
    // params: {query}
  })
}
export function Demand_Push (data) {
  return request({
    url: 'Meeting/Demand_Push',
    method: 'post',
    data
  })
}
export function PostMeetingOrderByData (data) {
  return request({
    url: 'Meeting/PostMeetingOrderByData',
    method: 'post',
    data
  })
}
