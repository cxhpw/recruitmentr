import request from '../utils/request'

/**
 *
 * @param {{
 * pageindex: Number,
 * pagesize: Number
 * }} params
 */
export function requestMessageList(params) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getchatroomlist',
      ...params,
    },
  })
}

/**
 * 获取消息详情
 * @param {{
 * pageindex: Number,
 * pagesize: Number,
 * id: Number
 * }} params 
 */
export function requestMessageDetailById(params) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getchatrecordlist',
      ...params,
    },
  })
}



