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
 * jobexpect
 * }} params 
 */
export function postUserInfo(params) {
  return request({
    url: '/include/getdata',
    method: 'post',
    data: {
      apiname: 'updatejobseeker',
      ...params
    },
  })
}
