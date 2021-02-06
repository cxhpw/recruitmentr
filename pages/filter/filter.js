const app = getApp()
import {
  requestResumeFilter,
  requestJopFilter,
  requestCompanyFilter,
} from '../../api/config'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    safeArea: app.globalData.safeArea ? 'safeArea' : '',
    educationOptions: [
      // '初中及以下',
      // '中专/中技',
      // '高中',
      // '大专',
      // '本科',
      // '硕士',
      // '博士',
    ],
    educationValue: [],
    experienceOptions: [
      // '在校生',
      // '应届生',
      // '1年以内',
      // '1-3年',
      // '3-5年',
      // '5-10年',
      // '10年以上',
    ],
    experienceValue: [],
    typesOptions: [
      // '离职-随时到岗',
      // '在职-暂不考虑',
      // '在职-考虑机会',
      // '在职-月内到岗',
    ],
    typesValue: [],
    salaryOptions: [
      // '3K以下', '3-5K', '5-10K', '10-20K', '20-50K', '50K以上'
    ],
    salaryValue: [],
    sizeOptions: [],
    sizeValue: [],
    industryOptions: [],
    industryValue: [],
  },
  onCancel(e) {
    const { target } = e.currentTarget.dataset
    this.setData({
      [`${target}`]: [],
    })
  },
  onSizeChange(event) {
    this.setData({
      sizeValue: event.detail,
    })
  },
  onindustryChange(event) {
    this.setData({
      industryValue: event.detail,
    })
  },
  onEducationsChange(event) {
    console.log(event)
    this.setData({
      educationValue: event.detail,
    })
  },
  onExperiencesChange(event) {
    this.setData({
      experienceValue: event.detail,
    })
  },
  onTypesChange(event) {
    console.log(event)
    this.setData({
      typesValue: event.detail,
    })
  },
  onWageChange(event) {
    const value = event.detail
    this.setData({
      salaryValue: value.length ? [value[value.length - 1]] : [],
    })
  },
  onClear() {
    this.setData(
      {
        salaryValue: [],
        typesValue: [],
        experienceValue: [],
        educationValue: [],
        sizeValue: [],
        industryValue: [],
      },
      () => {
        const {
          salaryValue,
          typesValue,
          experienceValue,
          educationValue,
          sizeValue,
          industryValue,
        } = this.data
        const page = getCurrentPages()[getCurrentPages().length - 2]
        page.setData({
          salaryValue,
          typesValue,
          experienceValue,
          educationValue,
          sizeValue,
          industryValue,
        })
      }
    )
    app.globalData.filterData = null
  },
  onConfirm() {
    const {
      salaryValue,
      typesValue,
      experienceValue,
      educationValue,
      sizeValue,
      industryValue,
    } = this.data
    app.setFilterData({
      salaryValue,
      typesValue,
      experienceValue,
      educationValue,
      sizeValue,
      industryValue,
    })
    const page = getCurrentPages()[getCurrentPages().length - 2]
    page.setData({
      salaryValue,
      typesValue,
      experienceValue,
      educationValue,
      sizeValue,
      industryValue,
    })
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type || '',
    })
    switch (options.type) {
      case 'jop':
        this.setData({
          educationOptions: app.globalData.educationOptions.slice(1),
          salaryOptions: app.globalData.salaryOptions.slice(1),
          experienceOptions: app.globalData.experienceOptions.slice(1),
          sizeOptions: app.globalData.companySizeOptions.slice(1),
          industryOptions: app.globalData.industryOptions.slice(1),
        })
        // requestJopFilter().then((res) => {
        //   console.log('职位筛选', res)
        //   this.setData({
        //     educationOptions: res.data[0].keyvalue.slice(1),
        //     salaryOptions: res.data[1].keyvalue.slice(1),
        //     experienceOptions: res.data[2].keyvalue.slice(1),
        //     sizeOptions: res.data[3].keyvalue.slice(1),
        //     industryOptions: res.data[4].keyvalue.slice(1),
        //   })
        // })
        break
      case 'company':
        this.setData({
          sizeOptions: app.globalData.companySizeOptions.slice(1),
          industryOptions: app.globalData.industryOptions.slice(1),
        })
        // requestCompanyFilter().then((res) => {
        //   console.log('公司筛选', res)
        //   this.setData({
        //     sizeOptions: res.data[0].keyvalue.slice(1),
        //     industryOptions: res.data[1].keyvalue.slice(1),
        //   })
        // })
        break
      default:
        this.setData({
          educationOptions: app.globalData.educationOptions.slice(1),
          salaryOptions: app.globalData.salaryOptions.slice(1),
          experienceOptions: app.globalData.experienceOptions.slice(1),
          typesOptions: app.globalData.jopStatusOptions.slice(1),
        })
        // requestResumeFilter().then((res) => {
        //   console.log('筛选条件', res)
        //   this.setData({
        //     educationOptions: res.data[0].keyvalue.slice(1),
        //     salaryOptions: res.data[1].keyvalue.slice(1),
        //     experienceOptions: res.data[2].keyvalue.slice(1),
        //     typesOptions: res.data[3].keyvalue.slice(1),
        //   })
        // })
        break
    }
    // 简历筛选
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('filterValue', (data) => {
      console.log('参数', data)
      this.setData({
        ...data,
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
  onShow: function () {
    // if (app.globalData.filterData) {
    //   this.setData({
    //     educationValue: app.globalData.filterData.educationValue,
    //     experienceValue: app.globalData.filterData.experienceValue,
    //     typesValue: app.globalData.filterData.typesValue,
    //     salaryValue: app.globalData.filterData.salaryValue,
    //   })
    // }
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
})
