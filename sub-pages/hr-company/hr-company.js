const app = getApp()
import { requestHRInfo } from '../../api/hr/company'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeNames: ['baseInfo'],
    user: app.globalData.hrInfo,
    count: 0,
  },
  onChange(e) {
    this.setData({
      activeNames: e.detail,
    })
  },
  onNavTo(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({
      url,
    })
  },
  onPreview(e) {
    var { user } = this.data
    wx.previewImage({
      current: user.Logo,
      urls: [user.Logo],
    })
  },
  onPreview1() {
    var { user } = this.data
    wx.previewImage({
      current: user.AlbumList[0].Img,
      urls: user.AlbumList.map((item) => {
        return item.Img
      }),
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
    requestHRInfo().then((res) => {
      const user = res.data
      let count = 0
      user.Logo && (count += 1)
      user.Abbreviat && (count += 1)
      user.CompanyName && (count += 1)
      user.Industry && (count += 1)
      user.StaffSize && (count += 1)
      app.globalData.hrInfo = user
      this.setData({
        user: user,
        count,
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
  onShareAppMessage: function () {},
})
