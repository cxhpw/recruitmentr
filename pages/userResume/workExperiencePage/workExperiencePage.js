const app = getApp()
import { postUserInfo, editResumeInfo } from '../../../api/user/user'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    checked: false,
    position: null,
    index: -1,
    user: null,
    type: 'add',
    form: {
      name: '',
      skills: '',
      department: '',
      jopName: '',
      jobType: '',
    },
    industry: [],
    industryValue: -1,
    identity: ['全职', '兼职'],
    identityValue: 0,
    city: null,
    startTimeRange: [[], []],
    startTimeRangeValue: [-1, -1],
    endTimeRange: [[], []],
    endTimeRangeValue: [0, -1],
    month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    workContent: '',
    workScore: '',
    start: '',
    end: '至今',
  },
  onDelete() {
    app.showModal({
      content: '是否删除?',
      success: (res) => {
        if (res.confirm) {
          editResumeInfo({
            action: 'workex',
            delete: 'delete',
            id: this.data.id,
          }).then(() => {
            wx.navigateBack()
          })
        }
      },
    })
  },
  onSwitchChange(e) {
    this.setData({
      checked: e.detail.value,
    })
  },
  onStartTimeRangeChange(e) {
    const { startTimeRange } = this.data
    this.setData({
      startTimeRangeValue: e.detail.value,
      start: `${startTimeRange[0][e.detail.value[0]]}.${
        startTimeRange[1][e.detail.value[1]]
      }`,
    })
  },
  onEndTimeRangeColChange(e) {
    console.log(e)
    const { column, value } = e.detail
    switch (column) {
      case 0:
        if (value > 0) {
          this.setData({
            [`endTimeRange[1]`]: this.data.month,
          })
        } else {
          this.setData({
            [`endTimeRange[1]`]: [],
            // [`endTimeRangeValue`]: [0, -1],
          })
        }
        break
      case 1:
        break
    }
  },
  onEndTimeRangeChange(e) {
    console.log(e)
    const { endTimeRange } = this.data
    this.setData({
      endTimeRangeValue: e.detail.value,
      end: `${endTimeRange[0][e.detail.value[0]]}.${
        endTimeRange[1][e.detail.value[1]]
      }`,
    })
  },
  onNavTo(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({
      url,
    })
  },
  onSwitch(e) {
    const { index } = e.currentTarget.dataset
    this.setData({
      identityValue: index,
    })
  },
  onIndustryChange(e) {
    this.setData({
      industryValue: e.detail.value,
    })
  },
  valid(value) {
    const {
      position,
      industryValue,
      startTimeRangeValue,
      end,
      start,
      workContent,
      workScore,
    } = this.data
    if (!value.name) {
      return app.showToast('请输入公司名称')
    } else if (industryValue == -1) {
      return app.showToast('请选择所在行业')
    } else if (startTimeRangeValue.indexOf(-1) >= 0) {
      return app.showToast('请选择在职时间')
    } else if (end.search('至今') == -1 && new Date(start) > new Date(end)) {
      return app.showToast('开始时间不能大于结束时间')
    } else if (!position) {
      return app.showToast('请选择期望行业')
    } else if (!workContent.length) {
      return app.showToast('请输入工作内容')
    } else if (!value.skills) {
      return app.showToast('请输入拥有技能')
    }
    return true
  },
  onSubmit(e) {
    const { value } = e.detail
    console.log(value)
    if (this.valid(value)) {
      const {
        position,
        industry,
        industryValue,
        workContent,
        workScore,
        checked,
        start,
        end,
      } = this.data
      const result = {
        CompanyName: value.name,
        Industry: industry[industryValue],
        StartTime: start,
        EndTime: end.search(/[至今|undefind]/) >= 0 ? '至今' : end,
        JobName: value.jopName || position.Name,
        JobType: position.Name,
        JobID: position.AutoID,
        WorkContent: workContent,
        HaveSkill: value.skills,
        Performance: workScore,
        Department: value.department,
        IsInternEx: checked ? '是' : '否',
      }

      editResumeInfo({
        action: 'workex',
        id: this.data.id,
        json: JSON.stringify(result),
      }).then(() => {
        wx.navigateBack()
      })
    }
  },
  initTimeRange(isEnd) {
    let start = 1990
    const now = new Date().getFullYear()
    const { startTimeRange, endTimeRange, month } = this.data
    let result = []
    while (start <= now) {
      result.unshift(start)
      start++
    }
    if (isEnd) {
      result.unshift('至今')
    }
    this.setData({
      [`${isEnd ? 'endTimeRange' : 'startTimeRange'}`]: [
        result,
        isEnd ? [] : month,
      ],
    })
  },
  restorePageData(index) {
    const {
      user,
      industry,
      startTimeRange,
      startTimeRangeValue,
      endTimeRange,
      endTimeRangeValue,
      month,
    } = this.data
    const data = user.WorkExList[index]
    // data.StartTime
    // data.EndTime
    const [syear, smonth] = data.StartTime.split('.')
    const [eyear, emonth] = data.EndTime.split('.')
    console.log(eyear, emonth)
    eyear != '至今' && (endTimeRange[1] = month)
    this.setData({
      form: {
        name: data.CompanyName,
        skills: data.HaveSkill,
        department: data.Department,
        jopName: data.JobName,
      },
      position: {
        Name: data.JobType,
        AutoID: data.JobID,
      },
      workContent: data.WorkContent,
      workScore: data.Performance,
      industryValue: industry.indexOf(data.Industry),
      id: data.AutoID,
      checked: data.IsInternEx == '是',
      startTimeRangeValue: [
        startTimeRange[0].indexOf(Number(syear)),
        startTimeRange[1].indexOf(Number(smonth)),
      ],
      endTimeRangeValue:
        eyear == '至今'
          ? [0, -1]
          : [
              endTimeRange[0].indexOf(Number(eyear)),
              month.indexOf(Number(emonth)),
            ],
      endTimeRange,
      start: `${syear}.${smonth}`,
      end: `${eyear}.${emonth}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initTimeRange()
    this.initTimeRange(true)
    wx.setNavigationBarTitle({
      title: options.type == 'edit' ? '编辑工作经历' : '添加工作经历',
    })

    this.setData(
      {
        index: options.index || this.data.index,
        user: app.globalData.userInfo,
        industry: app.globalData.industryOptions,
        type: options.type || this.data.type,
      },
      () => {
        if (options.index != undefined) {
          this.restorePageData(options.index)
        }
      }
    )
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
