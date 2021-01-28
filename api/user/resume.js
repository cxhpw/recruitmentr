import request from "../../utils/request";

/**
 * 投递简历
 * @param {{
 * cid: Number,
 * jid: Number,
 * rid: Number
 * }} params 
 */
export function postResumeToHr(params) {
  return request({
    url: "/include/getdata",
    method: "post",
    data: {
      apiname: "sendresume",
      ...params
    }
  })
}

/**
 * 同意或拒绝面试
 * @param {Number} id 
 */
export function postInterviewApply(id) {
  return request({
    url: "/include/getdata",
    mthod: "post",
    data: {
      apiname: "updateinterview",
      id
    }
  })
}