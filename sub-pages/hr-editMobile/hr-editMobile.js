const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: '',
  },
  valid(value) {
    if (!/^1\d{10}$/.test(this.data.value)) {
      return app.showToast('请输入正确手机号')
    }
    return true
  },
  onInput(e) {
    this.setData({
      value: e.detail.value
    })
  },
  onSubmit() {
    if (this.valid()) {
      this.eventHandler.emit('mobileData', { data: this.data.value })
      wx.navigateBack()
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.eventHandler = this.getOpenerEventChannel()
  },

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
  onReachBottom: function () {}
})
