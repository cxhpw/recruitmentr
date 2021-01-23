import request from '../utils/request'

/**
 * 获取招聘会列表
 * @param {{
 * pageindex: Number,
 * pagesize: Number
 * }} params
 */
export function requestList(params) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getjobfairlist',
      ...params,
    },
  })
}

/**
 * 获取招聘会详情
 * @param {Number} id
 */
export function requestDetailById(id) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getjobfairdetial',
      id: id,
    },
  })
}

/**
 * 获取招聘会企业列表
 * @param {{
 * pageindex: Number,
 * pagesize: Number,
 * id: Number
 * }} params
 */
export function requestListByFairId(params) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getjobfairapplylist',
      ...params,
    },
  })
}

/**
 * 招聘会报名
 * @param {Number} id 
 */
export function postJobFair(id) {
  return request({
    url: '/include/getdata',
    method: "post",
    data: {
      apiname: 'jobfairapply',
      id
    },
  })
}




