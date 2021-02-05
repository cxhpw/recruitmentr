const app = getApp()
import { requestJopDetailById } from '../../api/jobs'
import { postCollectById } from '../../api/user/collect'
import { postResumeToHr } from '../../api/user/resume'
import { auth, getRoleInfos } from '../../api/user'
import { requestUserInfo } from '../../api/user/user'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mylogin: app.globalData.mylogin,
    id: 0,
    data: null,
    isMore: false,
    code: 0,
  },
  onSubmit() {
    const { data } = this.data
    postResumeToHr({
      cid: data.CID,
      jid: data.AutoID,
      rid: data.RID,
    }).then((res) => {
      console.log(res)
      wx.navigateTo({
        url: `/pages/chatroom/chatroom?id=${res.data.ChatRoomID}`,
      })
    })
  },
  onMapTap() {
    const { WorkPlace, Address, Longitude, Latitude } = this.data.data
    wx.openLocation({
      latitude: Number(Latitude),
      longitude: Number(Longitude),
      name: WorkPlace,
      address: Address,
      scale: 18,
    })
  },
  onNavTo(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({
      url,
    })
  },
  getDetail(id) {
    requestJopDetailById(id).then((res) => {
      console.log('详情', res)
      this.setData({
        data: res.data,
      })
    })
  },
  onMore() {
    this.setData({
      isMore: false,
    })
  },
  onParseLoad() {
    console.log('加载完成')
    const query = wx.createSelectorQuery()
    query.select('.detail-section .content').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res) => {
      console.log(res)
      if (res[0].height > 24 * 15) {
        this.setData({
          isMore: true,
        })
      } else {
        this.setData({
          isMore: false,
        })
      }
      res[0].top // #the-id节点的上边界坐标
      res[1].scrollTop // 显示区域的竖直滚动位置
    })
  },
  onCollect() {
    postCollectById(this.data.id).then((res) => {
      app.showToast(res.data.msg, () => {
        if (res.data.ret == 'success') {
          this.setData({
            [`data.FavStatus`]: this.data.data.FavStatus == 1 ? 99 : 1,
          })
        }
      })
    })
  },
  onNavToCom() {
    const { data } = this.data
    wx.navigateTo({
      url: `/pages/companyDetail/companyDetail?id=${
        data.CID
      }&formData=${JSON.stringify({
        WorkPlace: data.WorkPlace,
        Longitude: data.Longitude,
        Latitude: data.Latitude,
        Address: data.Address,
      })}`,
    })
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
              app.globalData.roleInfo = res.data
              this.getUser()
                .then(() => {
                  this.getDetail(this.data.id)
                })
                .catch((err) => {
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
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      mylogin: app.globalData.mylogin,
    })
    app.mylogin = () => {
      this.setData({
        mylogin: app.globalData.mylogin,
      })
    }
    this.getDetail(options.id)
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
  onShareAppMessage: function () {},
})
