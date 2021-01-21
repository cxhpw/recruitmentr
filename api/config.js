import request from '../utils/request'

/**
 * 获取基本配置信息
 * @param {'bzgzsj'|'gsfl'|'zwlx'} params
 * @summary identy bzgzsj：标准工作时间 gsfl：公司福利 zwlx：职位类型
 */
export function requestConfig(params) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getbaseinfo',
      identy: params,
    },
  })
}

/**
 * 获取职位名称列表
 * @param {Number} id
 */
export function requestPositionNameById(id) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getjobclass',
      id: id,
    },
  })
}
/**
 * 获取所有职位名称列表
 */
export function requestPositionName() {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getjobclasslist',
    },
  })
}
