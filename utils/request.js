import { getTimeStr, encrypt } from './util'

export default function request(params) {
  const app = getApp()
  if (params.showLoading) {
    wx.showLoading({
      mask: true,
    })
  }

  params.url = app.api.host + params.url
  params.data.encrypttime = encodeURIComponent(
    encrypt(getTimeStr(Date.now(), 'datetime', true))
  )
  params.data.customrdsession = wx.getStorageSync('LogiSessionKey')
  params.header = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
  return new Promise((resolve, reject) => {
    params.success =
      params.success ||
      function (res) {
        if (res.data.ret == 'fail') {
          reject(res)
        } else {
          resolve(res)
        }
      }
    params.fail = function (err) {
      if (/DOCTYPE html/.test(err.data)) {
        wx.showModal({
          content: '请求失败',
          showCancel: false,
          success: function (res) {
            if (res.confirm && getCurrentPages().length > 1) {
              wx.navigateBack()
            }
          },
        })
      }
      if (/fail/.test(err.errMsg)) {
        wx.showModal({
          content: '请求超时,请检查网络状态',
          showCancel: false,
          success: function (res) {
            if (res.confirm && getCurrentPages().length > 1) {
              wx.navigateBack()
            }
          },
        })
      }
      reject(err)
    }
    wx.request(params)
    // .catch((err) => {
    //   console.error('catch', err)
    //   if (/fail/.test(err.errMsg)) {
    //     wx.showModal({
    //       content: '请求超时,请检查网络状态',
    //       showCancel: false,
    //       success: function (res) {
    //         if (res.confirm) {
    //           wx.navigateBack()
    //         }
    //       },
    //     })
    //   }
    // })
    // .finally(() => {
    //   if (params.showLoading) {
    //   }
    // })
  })
}
