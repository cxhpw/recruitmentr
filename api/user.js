import request from '../utils/request'
const app = getApp()
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
      ...params,
    },
  })
}

/**
 * 切换角色身份
 * @param { 1|99 } params
 * @summary params 角色类型 1:企业 99:求职者
 */
export function togglerRole(params) {
  return request({
    url: '/include/getdata',
    method: "post",
    data: {
      apiname: 'updaterole',
      roletype: params,
    },
  })
}

/**
 * 获取会员信息
 */
export function getRoleInfos(isRef = false, context = getApp()) {
  console.log(context)
  if (!isRef && Object.keys(context.globalData.userInfo).length) {
    return context.globalData.userInfo
  }
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getuserinfo',
    },
  })
}

/**
 *  手机授权
 * @param {{
 *  encryptedData: String,
 *  iv: String,
 *  code: String
 * }} params
 */
export function auth(params) {
  return request({
    url: '/include/getdata',
    method: 'post',
    data: {
      apiname: 'wechatuseropenid',
      ...params,
    },
  })
}
