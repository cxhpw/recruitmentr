const app = getApp()
import { requestUserInfo, postJopStatus } from '../../api/user/user'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    avatar: '',
    status: [],
    statusValue: -1,
    advantage: '',
    time: '',
  },
  onStatusChange(e) {
    this.setData({
      statusValue: e.detail.value,
    })
    postJopStatus(this.data.status[e.detail.value])
  },
  onNavTo(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({
      url,
    })
  },
  oNavTo(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({
      url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.showLoading({
      mask: true,
    })
    requestUserInfo()
      .then((res) => {
        app.globalData.userInfo = res.data
        const works = app.globalData.userInfo.WorkExList.slice()
        works.sort((a, b) => {
          return (
            new Date(a.StartTime).getTime() - new Date(b.StartTime).getTime()
          )
        })
        console.log('2153', works)
        this.setData({
          user: res.data,
          status: app.globalData.jopStatusOptions,
          statusValue: app.globalData.jopStatusOptions.indexOf(
            res.data.JobStatus
          ),
          time: works.length ? new Date().getFullYear() - works[0].StartTime.split('.')[0] : '',
        })
      })
      .finally(() => {
        wx.hideLoading()
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
