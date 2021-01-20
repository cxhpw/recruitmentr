const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    time: -1,
    ams: ['上午9:00', '上午10:00', '上午11:00', '上午12:00'],
    pms: ['下午6:00', '下午7:00', '下午8:00', '下午9:00'],
    am: 0,
    pm: 0,
    breakTime: ['双休', '单休', '大小周', '排版轮休'],
    breakTimeSelected: [],
    overtime: ['不加班', '偶尔加班', '弹性工作'],
    overtimeSelected: [],
  },
  bindTimeChange(e) {
    console.log(e)
  },
  onBreakTimeChange(e) {
    const value = e.detail
    this.setData({
      breakTimeSelected: value.length ? [value[value.length - 1]] : [],
    })
  },
  onOvertimeChange(e) {
    const value = e.detail
    this.setData({
      overtimeSelected: value.length ? [value[value.length - 1]] : [],
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
