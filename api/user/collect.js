import request from '../../utils/request'

/**
 * 获取收藏的职位
 * @param {{
 * pageindex: Number,
 * pagesize: Number
 * }} params
 */
export function requestList(params) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getjobseekerfavoriteslist',
      ...params,
    },
  })
}

/**
 * 收藏/取消收藏
 * @param {Number} id 
 */
export function postCollectById(id) {
  return request({
    url: '/include/getdata',
    method: 'post',
    data: {
      apiname: 'addjsfavorite',
      id,
    },
  })
}
