const app = getApp()
import { postUserInfo } from '../../api/user/user'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: app.globalData.userInfo,
    avatar: '',
    sex: ['男', '女'],
    sexValue: -1,
    date: '',
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value,
    })
  },
  onSexChange(e) {
    this.setData({
      sexValue: e.detail.value,
    })
  },
  onUpload() {
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        const src = res.tempFilePaths[0]
        console.log(src)
        wx.navigateTo({
          url: `/pages/avatar/avatar?src=${src}`,
        })
      },
    })
  },
  valid(value) {
    if (!value.name) {
      return app.showToast('请输入姓名')
    }
    return true
  },
  onSubmit(e) {
    console.log(213)
    const { value } = e.detail
    console.log(value)
    if (this.valid(value)) {
      const { avatar, user, date, sex, sexValue } = this.data
      postUserInfo({
        name: value.name,
        headerphoto: avatar,
        gender: sex[sexValue],
        birthday: date,
        email: value.email,
        advantage: user.Advantage,
        jobstatus: user.JobStatus,
        jobexpect: JSON.stringify(user.JobExpectList),
        workex: JSON.stringify(user.WorkExList),
        educatex: JSON.stringify(user.EducatExList),
      }).then((res) => {
        app.showToast(res.data.msg, () => {
          wx.navigateBack()
        })
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: app.globalData.userInfo,
      sexValue: this.data.sex.indexOf(app.globalData.userInfo.Gender.trim()),
      date: app.globalData.userInfo.Birthday,
      avatar: app.globalData.userInfo.HeaderPhoto,
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
