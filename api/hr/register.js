import request from '../../utils/request'

/**
 * 注册企业信息
 * @param {{
 * headerphoto: String,
 * job: String,
 * companyname: String,
 * abbreviat: String,
 * industry: String,
 * staffsize:String,
 * license: String,
 * identifier: String,
 * regnumber: String
 * }} params
 * @summary headerphoto 头像
 * @summary job 职务
 * @summary companyname 公司名称
 * @summary abbreviat 公司简介
 * @summary industry 公司行业
 * @summary staffsize 人员规模
 * @summary license 营业执照
 * @summary creditcode 统一社会信用代码
 * @summary identifier 纳税人识别码
 * @summary regnumber 工商注册号
 */
export function postCompanyRegister(params) {
  return request({
    url: '/include/getdata',
    method: 'post',
    data: {
      apiname: 'regcompany',
      ...params,
    },
  })
}

