import request from '@/utils/request'

export function getRoomOrderByData (query) {
  return request({
    url: 'order/getRoomOrderByData',
    method: 'get',
    params: query
  })
}
export function SetOrderByStatus (data) {
  return request({
    url: 'order/SetOrderByStatus',
    method: 'post',
    data
  })
}
/**
 * 会议室订单
 * @param {*} query 
 */
export function getmeetingOrderByData (query) {
  return request({
    url: 'order/getmeetingOrderByData',
    method: 'get',
    params: query
  })
}
export function SetmeetingOrderByStatus (data) {
  return request({
    url: 'order/SetmeetingByStatus',
    method: 'post',
    data
  })
}
