import request from '../utils/request'

export default function requestAd() {
  return request({
    url: '/include/getdata',
    data: {
      apiname: 'getadslist',
    },
  }) 
}