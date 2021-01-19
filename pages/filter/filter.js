const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    safeArea: app.globalData.safeArea ? 'safeArea' : '',
    educationSelector: [
      '初中及以下',
      '中专/中技',
      '高中',
      '大专',
      '本科',
      '硕士',
      '博士',
    ],
    educations: [],
    experienceSelector: [
      '在校生',
      '应届生',
      '1年以内',
      '1-3年',
      '3-5年',
      '5-10年',
      '10年以上',
    ],
    experiences: [],
    typeSelector: [
      '离职-随时到岗',
      '在职-暂不考虑',
      '在职-考虑机会',
      '在职-月内到岗',
    ],
    types: [],
    wageSelector: ['3K以下', '3-5K', '5-10K', '10-20K', '20-50K', '50K以上'],
    wages: [],
  },
  onCancel(e) {
    const { target } = e.currentTarget.dataset
    this.setData({
      [`${target}`]: [],
    })
  },
  onEducationsChange(event) {
    console.log(event)
    this.setData({
      educations: event.detail,
    })
  },
  onExperiencesChange(event) {
    this.setData({
      experiences: event.detail,
    })
  },
  onTypesChange(event) {
    this.setData({
      types: event.detail,
    })
  },
  onWageChange(event) {
    const value = event.detail
    this.setData({
      wages: value.length ? [value[value.length - 1]] : [],
    })
  },
  onClear() {
    this.setData({
      wages: [],
      types: [],
      experiences: [],
      educations: [],
    })
  },
  onConfirm() {
    const { wages, types, experiences, educations } = this.data
    app.setFilterData({wages, types, experiences, educations})
    wx.navigateBack()
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
