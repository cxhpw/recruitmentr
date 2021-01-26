import request from '../utils/request'

/**
 * 获取基本配置信息
 * @param {'bzgzsj'|'gsfl'|'zwlx'|'msbz'} params
 * @summary identy bzgzsj：标准工作时间 gsfl：公司福利 zwlx：职位类型
 */
export function requestConfig(params) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getbaseinfo',
      identy: params,
    },
  })
}

/**
 * 获取职位名称列表
 * @param {{
 * name: String,
 * id: Number
 * }} params
 */
export function requestPositionNameById(params) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getjobclass',
      ...params
    },
  })
}
/**
 * 获取所有职位名称列表
 */
export function requestAllPositionName() {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getjobclasslist',
    },
  })
}

/**
 * 简历筛选条件
 * @summary 学历要求, 薪资待遇, 经验要求, 求职意向
 */
export function requestResumeFilter() {
  return request({
    url: '/config/filter-resume.json',
    data: {}
  })
}

/**
 * 公司筛选条件
 * @summary 公司规模
 * @summary 行业分类
 */
export function requestCompanyFilter() {
  return request({
    url: '/config/filter-company.json',
    data: {},
  })
}

/**
 * 职位筛条件
 */
export function requestJopFilter() {
  return request({
    url: '/config/filter-job.json',
    data: {}
  })
}
