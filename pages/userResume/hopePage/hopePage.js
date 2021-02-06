const app = getApp()
import { postUserInfo, editResumeInfo } from '../../../api/user/user'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    position: null,
    index: -1,
    user: null,
    type: 'add',
    form: {},
    salary: [],
    salaryValue: -1,
    industry: [],
    industryValue: -1,
    identity: [
      { name: '全职', id: 26 },
      { name: '兼职', id: 28 },
    ],
    identityValue: 0,
    city: null,
    from: ''
  },
  onIdentityChange(e) {
    this.setData({
      identityValue: e.detail.value
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
  valid(e) {
    const { position, city, salaryValue, industryValue } = this.data
    if (!position) {
      return app.showToast('请选择期望职位')
    } else if (!city) {
      return app.showToast('请选择工作地点')
    } else if (salaryValue == -1) {
      return app.showToast('请选择薪资要求')
    } else if (industryValue == -1) {
      return app.showToast('请选择期望行业')
    }
    return true
  },
  onSubmit() {
    if (this.valid()) {
      const {
        user,
        index,
        type,
        identity,
        identityValue,
        city,
        position,
        industry,
        industryValue,
        salary,
        salaryValue,
      } = this.data
      const result = {
        TypeID: identity[identityValue].id,
        City: city[1].RegionName,
        JobID: position.AutoID,
        Job: position.Name,
        Industry: industry[industryValue],
        Salary: salary[salaryValue],
      }
      // type == 'add'
      //   ? user.JobExpectList.push(result)
      //   : user.JobExpectList.splice(index, 1, result)
      // const options = {
      //   name: user.Name,
      //   headerphoto: user.HeaderPhoto,
      //   gender: user.Gender,
      //   birthday: user.Birthday,
      //   email: user.Email,
      //   advantage: user.Advantage,
      //   jobstatus: user.JobStatus,
      //   jobexpect: JSON.stringify(user.JobExpectList),
      //   workex: JSON.stringify(user.WorkExList),
      //   educatex: JSON.stringify(user.EducatExList),
      // }
      editResumeInfo({
        action: 'jobexpect',
        id: this.data.id,
        json: JSON.stringify(result),
      }).then((res) => {
        wx.navigateBack()
      })
      // postUserInfo(options).then((res) => {})
    }
  },
  onDelete() {
    app.showModal({
      content: '是否删除?',
      success: (res) => {
        if (res.confirm) {
          editResumeInfo({
            action: 'jobexpect',
            delete: 'delete',
            id: this.data.id,
          }).then(() => {
            wx.navigateBack()
          })
        }
      },
    })
  },
  restorePageData(index) {
    const data = this.data.user.JobExpectList[index]
    const { salary, industry, identity } = this.data
    console.log(data)
    let identityValue = 0
    for (let index = 0; index < identity.length; index++) {
      const element = identity[index]
      if (element.id == data.TypeID) {
        identityValue = index
      }
    }
    this.setData({
      salaryValue: salary.indexOf(data.Salary),
      industryValue: industry.indexOf(data.Industry),
      city: [, { RegionName: data.City }],
      position: { Name: data.Job, AutoID: data.JobID },
      id: data.AutoID,
      identityValue,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(
      {
        index: options.index || this.data.index,
        user: app.globalData.userInfo,
        salary: app.globalData.salaryOptions,
        industry: app.globalData.industryOptions,
        type: options.type || this.data.type,
        from: options.from || ''
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
