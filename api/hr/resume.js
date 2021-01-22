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
      ...params,
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
      id,
    },
  })
}

/**
 * 管理面试
 * @param {{
 *  action: 'add'|'modify',
 *  id: Number,
 *  jid: Number,
 *  jsid: Number,
 *  phone: Number,
 *  time: Number,
 *  remark: Number,
 *  result: Number
 * }} params
 * @summary action add：面试邀请 modify：编辑牛人备注
 * @summary id 面试ID
 * @summary jid 职位ID
 * @summary jsid 求职者ID
 * @summary phone 电话
 * @summary time 时间
 * @summary remark 备注
 * @summary result 面试结果(牛人备注)
 */
export function postResumeRemark(params) {
  return request({
    url: '/include/getdata',
    method: 'post',
    data: {
      apiname: 'manageinterview',
      ...params,
    },
  })
}
