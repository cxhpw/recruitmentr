import request from '../../utils/request'

/**
 * 
 * @param {{
 * name: String,
 * headerphoto: String,
 * job: String,
 * logo: String,
 * staffsize: String,
 * intro: String,
 * workhours: String,
 * resttime: String,
 * overtime: String,
 * welfare: String,
 * album: String,
 * }} params 
 * @summary name 姓名
 * @summary headerphoto 头像
 * @summary job 职务
 * @summary logo 品牌Logo
 * @summary staffsize 人员规模
 * @summary intro 公司介绍
 * @summary workhours 工作时间
 * @summary resttime 休息时间
 * @summary overtime 加班情况
 * @summary welfare 福利待遇
 * @summary album 公司相册
 */
export function updateCompanyInfo(params) {
  return request({
    url: '/include/getdata',
    method: 'post',
    data: {
      apiname: 'updatecompany',
      ...params,
    },
  })
}

/**
 * 获取企业信息
 */
export function requestCompanyInfo() {
  request({
    url: '/include/getdata',
    data: {
      apiname: 'getcompanyinfo',
    },
  })
}

