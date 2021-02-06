const app = getApp()
import { requestResumeFilter } from '../../../api/config'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    timeRange: [['1990以前'], []],
    timeRangeValue: [-1, -1],
    education: [],
    educationValue: -1
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
        timeRangeValue: value,
      })
    }
  },
  onTimeRangeCancel(e) {
    console.log(e)
    this.setData({
      timeRangeValue: this.data.timeRangeValue
    })
  },
  initCol(year) {
    const count = 8
    const { timeRange } = this.data
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
    })
  },
  valid(value) {
    if (!value.school) {
      return app.showToast('请输入学校')
    } else if (this.data.educationValue == -1) {
      return app.showToast('请输入学历')
    } else if (!value.profession) {
      return app.showToast('请输入专业')
    } else if (this.data.timeRangeValue.indexOf(-1) !== -1) {
      return app.showToast('请选择时间段')
    }
    return true
  },
  onSubmit(e) {
    const { value } = e.detail
    console.log(value)
    if (this.valid(value)) {
      const formData = Object.assign({}, {
        school: value.school,
        profession: value.profession,
        education: this.data.education[this.data.educationValue],
        experience:value.experience,
        timeRange: `${this.data.timeRange[0][this.data.timeRangeValue[0]]}-${this.data.timeRange[1][this.data.timeRangeValue[1]]}`
      }, this.data.form)
      wx.navigateTo({
        url: `../advantage/advantage?formData=${JSON.stringify(formData)}`,
      })
    }
  },
  onEducationChange(e) {
    this.setData({
      educationValue: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    requestResumeFilter().then((res) => {
      console.log('====', res)
      this.setData({
        education:res.data[0].keyvalue.slice(1)
      })
    })
    this.setData({
      form: options.formData ? JSON.parse(options.formData) : {},
    })

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
})
