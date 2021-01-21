import request from '../utils/request'

/**
 * 获取地区数据
 */
export function requestRegion() {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getregionlist',
    },
  })
}


