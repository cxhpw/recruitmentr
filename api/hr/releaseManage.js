import request from '../../utils/request'

/**
 * 
 * @param {{
 * action: 'add'|'modify'|'close',
 * id: Number,
 * name: Number,
 * desc: String,
 * address: String,
 * housenumber: String,
 * type: String,
 * experience: String,
 * educat: String,
 * salary: String
 * }} params 
 * @summary id add时不填
 * @summary name 职位名称
 * @summary desc 职位描述
 * @summary address 工作地点
 * @summary housenumber 门牌号
 * @summary type 职位类型
 * @summary experience 经验要求
 * @summary educat 最低学历
 * @summary salary 薪资范围
 */
export function postReleaseJop(params) {
  return request({
    url: '/include/getdata',
    method: 'post',
    data: {
      apiname: 'managejob',
      ...params,
    },
  })
}

/**
 * 获取职位管理
 * @param {{
 * pageindex: Number,
 * pagesize: NUmber,
 * status: Number
 * }} params 
 * @summary status 0：全部 1：已关闭 99：开放中
 */
export function requestJopList(params) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getcompanyjoblist',
      ...params,
    },
  })  
}

/**
 * 获取职位管理详情
 * @param {Number} id 
 */
export function requestDetailById(id) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getcompanyjobdetial',
      id
    },
  })
}

