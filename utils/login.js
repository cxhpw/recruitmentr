console.log('LOGON',getApp())
module.exports = {
  login: function(options) {
    let app = getApp()
    var e = options.e
    if (e.detail.errMsg == 'getUserInfo:ok') {
      /* 授权 */
      var temp = {}
      temp.apiname = 'updateuserbinid'
      temp.customrdsession = wx.getStorageSync('LogiSessionKey')
      temp.iv = encodeURIComponent(e.detail.iv)
      temp.rawData = encodeURIComponent(e.detail.rawData)
      temp.signature = encodeURIComponent(e.detail.signature)
      options.data.code = encodeURIComponent(options.data.code)
      temp.encryptedData = encodeURIComponent(e.detail.encryptedData)
      temp = Object.assign({}, temp, options.data)
      console.log("授权参数",temp)
     return app.request({
       url: options.url,
       method: 'POST',
       data: temp,
       success: function (res) {
         var auth = res
         /* 授权成功 */
         if (res.data.ret == 'success' && res.data.rdsession) {
           app.globalData.mylogin = true
           wx.setStorageSync('LogiSessionKey', res.data.rdsession)
           options.success && options.success(res)
           /* 获取用户信息 */
           app.onLaunch()
         } else {
           options.fail && options.fail(res)
         }
       },
       fail: function (err) {
         err = Object.assign(err, {
           updateuserbinid: 'error',
         })
         options.fail && options.fail(err)
       },
       complete: options.complete || function () {},
     })
    } else {
      wx.showToast({
        title: '未授权',
        icon: 'none'
      })
    }
  }
}
