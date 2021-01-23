import request from '../../utils/request'

/**
 * 收藏/取消收藏
 * @param {Number} id
 */
export function postCollect(id) {
  return request({
    url: '/include/getdata',
    method: 'post',
    data: {
      apiname: 'addcfavorite',
      id,
    },
  })
}

/**
 * 获取收藏的牛人
 * @param {{
 * pageindex: Number,
 * pagesize: Number,
 * status: Number
 * }} params 
 * @summary status 0：全部 1：待沟通 99：沟通中
 */
export function requestList(params) {
  
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getcompanyfavoriteslist',
      ...params,
    },
  })
}



