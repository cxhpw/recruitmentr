const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    baseInsurance: [
      {
        name: '五险一金',
        summary:
          '缴纳养老保险、医疗保险、失业保险、工伤保险、生育保险和住房公积金',
      },
      {
        name: '补充医疗保险',
        summary: '补充医疗保险、商业医疗保险、社会互助和社区医疗保险等多种形式',
      },
      {
        name: '定期体检',
        summary: '阶段性职业健康检查',
      },
    ],
    baseInsuranceValue: [],
    reward: [
      { name: '加班补助', summary: '正常工作时间之外的工资报酬' },
      { name: '全勤奖', summary: '对于全勤员工给予全勤奖' },
      {
        name: '年终奖',
        summary: '年末给予员工年终奖励，对一年来的工作业绩给予肯定',
      },
      { name: '股票期权', summary: '对优秀员工提供股票期权' },
    ],
    rewardValue: [],
    holiday: [
      { name: '带薪年假', summary: '为员工提供带薪年休假' },
      { name: '员工旅游', summary: '组织员工旅游活动' },
    ],
    holidayValue: [],
    subsidy: [
      { name: '免费班车', summary: '配有班车，免费接送员工上下班' },
      { name: '餐补', summary: '工作餐的额外补贴' },
      { name: '通讯补贴', summary: '补贴员工因公实际发生的公务话费' },
      { name: '交通补助', summary: '补贴员工因公实际发生的交通费用' },
      { name: '包吃', summary: '补贴员工因公实际发生的饮食费用' },
      { name: '节日福利', summary: '法定或者特定节日时提供礼物' },
      { name: '住房补贴', summary: '每月员工因公实际发生的住宿费用' },
      { name: '零食下午茶', summary: '为员工提供零食、饮料、水果茶作为下午茶' },
    ],
    subsidyValue: [],
  },
  onBaseInsuranChange(e) {
    this.setData({
      baseInsuranceValue: e.detail,
    })
  },
  onRewardChange(e) {
    this.setData({
      rewardValue: e.detail,
    })
  },
  onHolidayChange(e) {
    this.setData({
      holidayValue: e.detail,
    })
  },
  onSubsidyChange(e) {
    this.setData({
      subsidyValue: e.detail,
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
