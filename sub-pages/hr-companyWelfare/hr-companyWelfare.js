const app = getApp()
import { requestConfig } from '../../api/config'
import { updateCompanyInfo } from '../../api/hr/company'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: app.globalData.hrInfo,
    baseInsurance: [],
    baseInsuranceValue: [],
    reward: [],
    rewardValue: [],
    holiday: [],
    holidayValue: [],
    subsidy: [],
    subsidyValue: [],
    baseInsuranceWelfare: [],
    rewardWelfare: [],
    holidayWelfare: [],
    subsidyWelfare: [],
  },
  onBaseInsuranChange(e) {
    console.log(e.detail)
    let baseInsuranceWelfare = []
    e.detail.forEach((id) => {
      this.data.baseInsurance.forEach((item) => {
        if (id == item.ContID) {
          baseInsuranceWelfare.push(item.Title)
        }
      })
    })
    this.setData({
      baseInsuranceValue: e.detail,
      baseInsuranceWelfare,
    })
  },
  onRewardChange(e) {
    let rewardWelfare = []
    e.detail.forEach((id) => {
      this.data.reward.forEach((item) => {
        if (id == item.ContID) {
          rewardWelfare.push(item.Title)
        }
      })
    })
    this.setData({
      rewardValue: e.detail,
      rewardWelfare,
    })
  },
  onHolidayChange(e) {
    let holidayWelfare = []
    e.detail.forEach((id) => {
      this.data.holiday.forEach((item) => {
        if (id == item.ContID) {
          holidayWelfare.push(item.Title)
        }
      })
    })
    this.setData({
      holidayValue: e.detail,
      holidayWelfare,
    })
  },
  onSubsidyChange(e) {
    let subsidyWelfare = []
    e.detail.forEach((id) => {
      this.data.subsidy.forEach((item) => {
        if (id == item.ContID) {
          subsidyWelfare.push(item.Title)
        }
      })
    })
    this.setData({
      subsidyValue: e.detail,
      subsidyWelfare,
    })
  },
  onSubmit() {
    const {
      user,
      baseInsuranceValue,
      rewardValue,
      holidayValue,
      subsidyValue,
    } = this.data
    const welfare = baseInsuranceValue
      .concat(rewardValue, holidayValue, subsidyValue)
      .join(',')
    updateCompanyInfo({
      name: user.Name,
      headerphoto: user.HeaderPhoto,
      job: user.Job,
      logo: user.Logo,
      staffsize: user.StaffSize,
      intro: user.Intro,
      workhours: user.WorkHours,
      resttime: user.RestTime,
      overtime: user.OverTime,
      welfare: welfare,
      album: user.AlbumList.map((item) => item.Img).join(','),
    }).then((res) => {
      app.showToast('更新成功', () => {
        wx.navigateBack()
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: app.globalData.hrInfo,
    })
    requestConfig('gsfl').then((res) => {
      console.log(res)
      const welfareList = app.globalData.hrInfo.WelfareList
      const data = res.data.dataList
      let baseInsuranceValue = [],
        rewardValue = [],
        holidayValue = [],
        subsidyValue = [],
        baseInsuranceWelfare = [],
        rewardWelfare = [],
        holidayWelfare = [],
        subsidyWelfare = []
      data.forEach((item, index) => {
        welfareList.forEach((welfare) => {
          if (item.NodeID === welfare.NodeID) {
            switch (index) {
              case 0:
                baseInsuranceValue.push(String(welfare.ContID))
                baseInsuranceWelfare.push(welfare.Title)
                break
              case 1:
                rewardValue.push(String(welfare.ContID))
                rewardWelfare.push(welfare.Title)
                break
              case 2:
                holidayValue.push(String(welfare.ContID))
                holidayWelfare.push(welfare.Title)
                break
              case 3:
                subsidyValue.push(String(welfare.ContID))
                subsidyWelfare.push(welfare.Title)
                break
            }
          }
        })
      })

      this.setData({
        baseInsurance: data[0].ContentList,
        reward: res.data.dataList[1].ContentList,
        holiday: data[2].ContentList,
        subsidy: data[3].ContentList,
        baseInsuranceValue,
        rewardValue,
        holidayValue,
        subsidyValue,
        baseInsuranceWelfare,
        rewardWelfare,
        holidayWelfare,
        subsidyWelfare,
      })
    })
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
