import request from '../utils/request'

/**
 * 企业列表
 * @param {{
 * pageindex: Number,
 * pagesize: Number,
 * action: 'recommend',
 * name: String,
 * area: String,
 * staffsize: String,
 * industry: String
 * }} params
 * @summary action 非必填
 * @staffsize 公司规模
 * @industry 行业分类
 */
export function requestCompanyList(params) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getcompanylist',
      ...params,
    },
  })
}

/**
 * 获取公司详情
 * @param {Number} id 
 */
export function requestCompanyDetailById(id) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getcompanydetial',
      id,
    },
  })
}
