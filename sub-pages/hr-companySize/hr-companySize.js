const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: '1',
    arr: [
      '0-20人',
      '20-99人',
      '100-499人',
      '500-999人',
      '1000-9999人',
      '10000人以上',
    ],
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    })
  },
  onClick(event) {
    const { name } = event.currentTarget.dataset
    this.setData({
      value: name,
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
