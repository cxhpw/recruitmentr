import request from '../../utils/request'

/**
 * 获取沟通过的牛人
 * @param {{
 * pageindex: Number,
 * pagesize:Number
 * }} params
 */
export function requestList(params) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getcontactslist',
      ...params,
    },
  })
}
