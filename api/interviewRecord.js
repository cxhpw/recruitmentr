import request from '../utils/request'
//面试记录
import request from '../utils/request'

/**
 * 
 * @param {{
 * pageindex:Number,
 * pagesize: Number,
 * status: Number
 * }} params 
 * @summary status 0：全部 1：待接受
10：待面试
99：已面试
100：已拒绝
 */
export function requestList(params) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getinterviewlist',
      ...params,
    },
  })
}

/**
 * 获取面试详情
 * @param {Number} id 
 */
export function requestDetailById(id) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getinterviewdetial',
      id: id
    },
  })
}


