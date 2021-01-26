const app = getApp()
import { requestResumeFilter, requestCompanyFilter } from '../../../api/config'
import { registerUser } from '../../../api/user/register'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchKey: '',
    form: {},
    position: null,
    city: '',
    salary: [],
    salaryValue: -1,
    industry: [],
    industryValue: -1
  },
  onNavTo(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({
      url,
    })
  },
  valid() {
    if (!this.data.position && !this.data.searchKey) {
      return app.showToast('请选择期望职位')
    } else if (!this.data.city.length) {
      return app.showToast('请选择工作城市')
    } else if (this.data.salaryValue == -1) {
      return app.showToast('请选择薪资要求')
    } else if (this.data.industryValue == -1 ) {
      return app.showToast('请选择期望行业')
    }
    return true
  },
  onSubmit() {
    if (this.valid()) {
      const { form } = this.data
      wx.showLoading({
        mask: true,
      })
      registerUser({
        name: form.name,
        headerphoto: form.avatar,
        gender: form.sex,
        birthday: form.date,
        experience: form.identity,
        advantage: form.advantage,
        educatex: JSON.stringify([{
          School: form.school,
          Educat: form.education,
          Specialty: form.profession,
          TimePart: form.timeRange,
          SchoolEx: form.experience,
        }]),
        jobexpect: JSON.stringify([{
          City: this.data.city[1].RegionName,
          Job: this.data.position.Name || this.data.searchKey,
          Industry: this.data.industry[this.data.industryValue],
          Salary: this.data.salary[this.data.salaryValue],
        }]),
      })
        .then((res) => {
          console.log(res)
          app.globalData.selectPostion = []
          wx.switchTab({
            url: "/pages/my/my"
          })
        })
        .finally(() => {
          wx.hideLoading()
        })
    }
  },
  onSalaryChange(e) {
    this.setData({
      salaryValue: e.detail.value,
    })
  },
  onIndustryChange(e) {
    this.setData({
      industryValue: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    requestCompanyFilter().then((res) => {
      console.log('====', res)
      this.setData({
        industry: res.data[1].keyvalue,
      })
    })
    requestResumeFilter().then((res) => {
      console.log('====', res)
      this.setData({
        salary: res.data[1].keyvalue,
      })
    })
    this.setData({
      form: JSON.parse(options.formData),
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('app.globalData.selectPostion', app.globalData.selectPostion)
    if (
      app.globalData.selectPostion.length &&
      app.globalData.selectPostion[2]
    ) {
      this.setData({
        position: app.globalData.selectPostion[2],
        searchKey: '',
      })
    } else {
      this.setData({
        position: null,
      })
    }
  },

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
