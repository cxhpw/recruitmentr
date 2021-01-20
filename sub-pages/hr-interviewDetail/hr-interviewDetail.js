const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    labels: [
      '入职',
      '需要二面',
      '不通过',
      '牛人没来面试',
      '待定',
      '待回复',
      '面试通过',
      '淘汰',
    ],
    labelsSelected: [],
  },
  onLabelsChange(e) {
    this.setData({
      labelsSelected: e.detail,
    })
  },
  onRemarkTap() {
    this.setData({
      show: true,
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
