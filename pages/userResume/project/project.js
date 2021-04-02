const app = getApp()
import { postUserInfo } from '../../../api/user/user'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checked: false,
    position: null,
    index: -1,
    user: null,
    type: 'add',
    form: {},
    salary: [],
    salaryValue: -1,
    industry: [],
    industryValue: -1,
    identity: ['全职', '兼职'],
    identityValue: 0,
    city: null,
    startTimeRange: [[], []],
    startTimeRangeValue: [-1, -1],
    endTimeRange: [[], []],
    endTimeRangeValue: [-1, -1],
    month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    projectDesc: '',
    projectScore: '',
    start: '',
    end: '至今',
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
    if (e.detail.value[0] != 0 && e.detail.value[1] == -1) {
      return
    }
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
  onSalaryChange(e) {
    this.setData({
      salaryValue: e.detail.value,
    })
  },
  valid(value) {
    const { projectDesc, projectScore } = this.data
    if (!value.name) {
      return app.showToast('请输入项目名称')
    } else if (!value.role) {
      return app.showToast('请输入项目担任角色')
    } else if (!projectDesc.length) {
      return app.showToast('请输入项目描述')
    }
    return true
  },
  onDelete() {
    app.showModal({
      content: '是否删除?',
      success: (res) => {
        if (res.confirm) {
          editResumeInfo({
            delete: 'delete',
            id: this.data.id,
          }).then(() => {
            wx.navigateBack()
          })
        }
      },
    })
  },
  onSubmit(e) {
    const { value } = e.detail
    console.log(value)
    if (this.valid(value)) {
      const {
        user,
        index,
        type,
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
        JobName: position.Name,
        WorkContent: workContent,
        HaveSkill: value.skills,
        Performance: workScore,
        Department: value.department,
        IsInternEx: checked ? '是' : '否',
      }
      type == 'add'
        ? user.WorkExList.push(result)
        : user.WorkExList.splice(index, 1, result)
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
      wx.showLoading({
        mask: true,
      })
      postUserInfo(options).then((res) => {
        wx.hideLoading()
        if (res.data.ret == 'fail') {
          app.showToast(res.data.msg)
        } else {
          wx.navigateBack()
        }
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
    const { user } = this.data
    const work = user.WorkExList[index]
    this.setData({
      // workContent: user.
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initTimeRange()
    this.initTimeRange(true)
    wx.setNavigationBarTitle({
      title: options.type == 'edit' ? '编辑工作尽力' : '添加工作经历',
    })

    this.setData(
      {
        index: options.index || this.data.index,
        user: app.globalData.userInfo,
        salary: app.globalData.salaryOptions,
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
