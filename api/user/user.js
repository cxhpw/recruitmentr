import request from '../../utils/request'

export function requestUserInfo(params) {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getjobseekerinfo',
    },
  })
}
