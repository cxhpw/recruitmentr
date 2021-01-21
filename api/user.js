import request from '../utils/request'

/**
 * 修改个人信息
 * @param {{
 * NickName: String,
 * Gender: String,
 * Mobile: Number,
 * Remark: String,
 * Province: String,
 * City: String,
 * County: String,
 * Email: String,
 * Address: String,
 * RealName: String,
 * HeaderPhoto: String,
 * Birthday: string
 * }} params 
 */
export function postUserInfo(params) {
  return request({
    url: '/Include/Weixin/wechatdata',
    method: 'post',
    data: {
      apiname: 'modifyuserinfo',
      ...params
    },
  })
}