import request from '../../utils/request'

/**
 * 简历列表
 * @param {{
 * pageindex: Number,
 * pagesize: Number,
 * action: 'recommend'|'new',
 * name: String,
 * area: String,
 * educat: String,
 * salary: String,
 * experience: String,
 * status: String
 * }} params
 * @summary name 职位名称
 * @summary area 区域
 * @summary educat 学历要求
 * @summary salary 薪资要求
 * @summary experience 经验要求
 * @summary status 求职状态
 */
export function requestList(params) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getresumelist',
      ...params
    },
  })
}

/**
 * 获取简历详情
 * @param {Number} id 
 */
export function requestDetailById(id) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getresumedetial',
      id
    },
  })
}


