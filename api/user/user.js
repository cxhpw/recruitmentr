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
