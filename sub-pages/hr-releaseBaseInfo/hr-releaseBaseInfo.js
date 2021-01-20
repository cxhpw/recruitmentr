const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    name: '',
    show: false,
    type: ['社招', '实习生招聘', '兼职招聘'],
    typeSelected: [],
  },
  onTypeChange(e) {
    console.log(e)
    const value = e.detail
    this.setData({
      typeSelected: value.length ? [value[value.length - 1]] : [],
    })
  },
  onNavTo(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({
      url,
    })
  },
  onSubmit() {
    wx.navigateTo({
      url: '/sub-pages/hr-releaseJopRequire/hr-releaseJopRequire',
    })
  },
  onClick() {
    this.setData({
      show: true,
    })
  },
  onClose() {
    this.setData({ show: false })
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
  onShow: function () {},

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
