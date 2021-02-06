import request from '../utils/request'

/**
 * 发送消息
 * @param {{
 * recvid: Number,
 * chatroomid: Number,
 * content: String
 * }} params
 */
export function postMessage(params) {
  return request({
    method: "post",
    url: '/include/getdata',
    data: {
      apiname: 'sendmessage',
      ...params,
    },
  })
}
