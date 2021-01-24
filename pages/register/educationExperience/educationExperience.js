const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    timeRange: [['1990以前'], []],
    timeRangeValue: [-1, -1],
  },
  onTimeRangeColChange(e) {
    console.log(e)
    const { column, value } = e.detail
    if (column == 0) {
      this.initCol(this.data.timeRange[column][value])
    }
  },
  onTimeRangeChange(e) {
    console.log(e)
    const { value } = e.detail
    if (value.indexOf('-1') === -1) {
      this.setData({
        timeRangeValue: value
      })
    }
  },
  initCol(year) {
    const count = 5
    const { timeRange, timeRangeValue } = this.data
    timeRange[1] = []
    if (!year || year == '1990以前') {
      year = 1990
    }
    for (let i = 0; i < count; i++) {
      year += 1
      timeRange[1].unshift(year)
    }
    this.setData({
      timeRange,
      [`timeRangeValue[1]`]: 2
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const nowYear = new Date().getFullYear()
    let startYear = 1990
    const { timeRange } = this.data
    while (startYear <= nowYear) {
      timeRange[0].unshift(startYear)
      startYear++
    }
    console.log(timeRange)
    this.setData({
      timeRange,
    })
    this.initCol()
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
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
