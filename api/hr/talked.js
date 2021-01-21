import request from '../../utils/request'
import { requestList } from './resume'

/**
 * 获取沟通过的牛人
 * @param {{
 * pageindex: Number,
 * pagesize:Number
 * }} params 
 */
export function requestList(params) {
  return request({
    url: 'getcontactslist',
    ...params,
  })
}

