import request from '../../utils/request'

/**
 * 求职者信息
 */
export function requestUserInfo() {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getjobseekerinfo',
    },
  })
}

/**
 * 晚上用户信息，个人简历
 * @param {{
 *  name: String,
 * headerphoto: String,
 * gender: String,
 * birthday: String,
 * email: String,
 * advantage: String,
 * jobstatus: String,
 * jobexpect: JSON,
 * workex: JSON,
 * educatex: JSON
 * }} params
 * @summary name 姓名
 * @summary headerphoto 头像
 * @summary gender 性别
 * @summary birthday 出生日期
 * @summary email 邮箱
 * @summary advantage 个人优势
 * @summary jobstatus 求职状态
 * @summary jobexpect 求职期望
 * @summary workex 工作经历
 * @summary educatex 教育经历
 */
export function postUserInfo(params) {
  return request({
    url: '/include/getdata',
    method: 'post',
    data: {
      apiname: 'updatejobseeker',
      ...params,
    },
  })
}

/**
 *
 * @param {{
 * action: 'jobexpect'|'workex'|'educatex',
 * id: Number,
 * json: JSON
 * }} params
 */
export function editResumeInfo(params) {
  return request({
    url: '/include/getdata',
    method: 'post',
    data: {
      apiname: 'updatejobseekerfield',
      ...params,
    },
  })
}

/**
 * 求职状态
 * @param {String} params 
 */
export function postJopStatus(params) {
  return request({
    url: "/include/getdata",
    method: "post",
    data: {
      apiname: "updatejobstatus",
      jobstatus: params
    }
  })
}
