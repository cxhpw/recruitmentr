import request from '../../utils/request'

/**
 * 获取站内信列表
 * @param {{
 * pageindex: Number,
 * pagesize: Number
 * }} params 
 */
export function requestLetter(params) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getsitemessagelist',
      ...params,
    },
  })
}

/**
 * 获取站内信详情
 * @param {Number} id 
 */
export function requestLetterDetailById(id) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getsitemessagedetial',
      id,
    },
  })
}

