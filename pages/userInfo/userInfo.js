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
  valid() {},
  onSubmit(e) {
    const { value } = e.detail
    if (this.valid(value)) {
      postUserInfo({
        name: user.Name,
        headerphoto: user.HeaderPhoto,
        gender: user.Gender,
        birthday: user.Birthday,
        email: user.Email,
        advantage: user.Advantage,
        jobstatus: user.JobStatus,
        jobexpect: user.JobExpectList,
        workex: user.WorkExList,
        educatex: user.EducatExList,
      }).then((res) => {})
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