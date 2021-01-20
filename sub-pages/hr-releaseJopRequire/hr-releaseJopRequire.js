const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    experience: ['不限', '一年以内', '1-3年内', '3-5年内'],
    experienceValue: -1,
    education: ['小学', '初中', '高中', '大学'],
    educationValue: -1,
    salary: [
      ['5K-6K', '5K-6K'],
      ['12个月', '13个月', '14个月'],
    ],
    salaryValue: [-1, -1],
  },
  onSalaryChange(e) {
    console.log(e)
    this.setData({
      salaryValue: e.detail.value
    })
  },
  onSalaryColumnChange() {},
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
