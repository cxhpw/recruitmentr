const app = getApp()
import { postUserInfo } from '../../../api/user/user'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: -1,
    user: null,
    type: 'add',
    form: {},
    education: [],
    educationValue: -1,
    timeRange: [['1990以前'], []],
    timeRangeValue: [-1, -1],
    experience: '',
  },
  valid(value) {
    const { timeRangeValue } = this.data
    if (!value.name) {
      return app.showToast('请输入学校名称')
    } else if (industryValue == -1) {
      return app.showToast('请选择学历')
    } else if (startTimeRangeValue.indexOf(-1) >= 0) {
      return app.showToast('请输入专业')
    } else if (timeRangeValue[0] == -1 || timeRangeValue[1] == -1 ) {
      return app.showToast('请输入时间段')
    }
    return true
  },
  onSubmit(e) {
    const { value } = e.detail
    console.log(value)
    if (this.valid(value)) {
      const {
        education,
        educationValue,
        timeRange,
        timeRangeValue,
        experience,
      } = this.data
      const result = {
        School: value.name,
        Educat: education[educationValue],
        Specialty: value.specialty,
        TimePart: `${timeRange[0][timeRangeValue[0]]}-${
          timeRange[1][timeRangeValue[1]]
        }`,
        SchoolEx: experience,
      }
      type == 'add'
        ? user.EducatExList.push(result)
        : user.EducatExList.splice(index, 1, result)
      const options = {
        name: user.Name,
        headerphoto: user.HeaderPhoto,
        gender: user.Gender,
        birthday: user.Birthday,
        email: user.Email,
        advantage: user.Advantage,
        jobstatus: user.JobStatus,
        jobexpect: JSON.stringify(user.JobExpectList),
        workex: JSON.stringify(user.WorkExList),
        educatex: JSON.stringify(user.EducatExList),
      }
      console.log(options)
      postUserInfo(options).then((res) => {
        if (res.data.ret == 'fail') {
          app.showToast(res.data.msg)
        } else {
          wx.navigateBack()
        }
      })
    }
  },
  restorePageData(index) {
    const { user } = this.data
    const work = user.WorkExList[index]
    this.setData({
      // workContent: user.
    })
  },
  onEducationChange(e) {
    this.setData({
      educationValue: e.detail.value,
    })
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
      timeRangeValue: this.data.timeRangeValue,
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.type == 'edit' ? '编辑教育经历' : '添加教育经历',
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
    this.setData({
      index: options.index || this.data.index,
      user: app.globalData.userInfo,
      type: options.type || this.data.type,
      education: app.globalData.educationOptions,
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
})
