const app = getApp()
import { auth, getRoleInfos, togglerRole } from '../../api/user'
import { requestUserInfo } from '../../api/user/user'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mylogin: false,
    user: {},
    isRegister: false,
    code: -1,
  },
  onPhone(e) {
    console.log('weapp绑定手机', e)
    const { detail } = e
    const { user, code } = this.data
    if (detail.errMsg.indexOf('fail') > -1) {
      console.log('授权手机失败')
      app.showToast('未授权')
    } else {
      auth({
        encryptedData: encodeURIComponent(detail.encryptedData),
        iv: encodeURIComponent(detail.iv),
        code,
      })
        .then((res) => {
          console.log(res)
          if (res.data.ret == 'success') {
            wx.setStorageSync('LogiSessionKey', res.data.rdsession)
            app.globalData.auth = true
            getRoleInfos().then((res) => {
              console.log('授权信息', res)
              app.globalData.roleInfo = res

              this.getUser().catch((err) => {
                console.error('求职者信息', err)
                if (err.reponsive.msg == '请注册求职者信息！') {
                  wx.reLaunch({
                    url: '/pages/register/register',
                  })
                  return
                }
              })
            })
          }
        })
        .catch((err) => {
          console.error(err)
        })
    }
  },
  onNavTo(e) {
    let { url } = e.currentTarget.dataset
    const { mylogin, isRegister } = this.data
    if (!this.data.mylogin) {
      return
    }
    wx.navigateTo({
      url,
    })
  },
  onNavToHr() {
    togglerRole(1).then(() => {
      wx.reLaunch({
        url: '/sub-pages/main/main',
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      mylogin: app.globalData.mylogin,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.login({
      success: (e) => {
        this.setData({
          code: e.code,
        })
      },
    })
    this.getUser().catch(() => {
      wx.removeStorageSync('LogiSessionKey')
    })
  },
  getUser() {
    return new Promise((resolve, reject) => {
      requestUserInfo()
        .then((res) => {
          console.log('求职者信息', res)
          app.globalData.mylogin = true
          app.globalData.userInfo = res.data
          this.setData({
            user: res.data,
            mylogin: true,
          })
        })
        .catch((err) => {
          // console.error('求职者信息', err)
          reject(err)
          // if (err.reponsive.msg == '请注册求职者信息！') {
          //   wx.reLaunch({
          //     url: '/pages/register/register',
          //   })
          //   return
          // }
          // wx.reLaunch({
          //   url: '/pages/register/register'
          // })
        })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '柯城就业创业招聘网',
      path: '/pages/index/index',
      imageUrl: 'https://s3.ax1x.com/2021/01/21/sh67FI.jpg',
    }
  },
})
