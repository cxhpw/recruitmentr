import request from '../utils/request'

/**
 * 职位列表
 * @param {{
 * pageindex: Number,
 * pagesize: Number,
 * action: '社招'|'实习生招聘'|'兼职招聘',
 * name: String,
 * cid: Number,
 * area: String,
 * educat: String,
 * salary: String,
 * experience: String,
 * staffsize: String,
 * industry: String
 * }} params 
 * @summary name 搜索关键词
 * @summary area 城市
 * @summary educat 学历
 * @summary salary 工资要求
 * @summary experience 经验
 * @summary staffsize 公司规模
 * @summary industry 行业分类
 */
export function requestJopsList(params) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getjoblist',
    },
  })
}