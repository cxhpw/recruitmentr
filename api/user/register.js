import request from '../../utils/request'

/**
 * 求职端注册
 * @param {{
 * name:String,
 * headerphoto: String,
 * gender: String,
 * birthday: String,
 * experience: String,
 * educatex: JSON,
 * advantage: String,
 * jobexpect: JSON
 * }} params 
 */
export function registerUser(params) {
  return request({
    url: '/include/getdata',
    method: "post",
    data: {
      apiname: 'regjobseeker',
      ...params
    },
  })
}