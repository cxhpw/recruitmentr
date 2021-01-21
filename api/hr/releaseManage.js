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

export function requestJopInfo(params) {
  return request({
    url: 
  })
}