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

/**
 * 
 * @param {Number} params 
 */
export function requestRegionById(params) {
  let temp = {
    apiname: 'getregion',
  }
  params && (temp.regioncode = params)
  return request({
    url: '/include/getdata',
    data: temp,
  })
}


