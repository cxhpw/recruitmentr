import request from '../../utils/request'

/**
 * 立即沟通
 * @param {Number} id
 * @summary id 求职者ID
 * @description 返回聊天室ID
 */
export function postMessage(id) {
  return request({
    url: '/include/getdata',
    method: "post",
    data: {
      apiname: 'immediatelychat',
      id
    },
  })
}