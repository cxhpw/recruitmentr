import { updateCompanyInfo } from '../../api/hr/company'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: app.globalData.hrInfo,
    roleInfo: app.globalData.roleInfo,
    avatar: '',
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
    } else if (/^1\d{10}$/.test(value.mobile)) {
      return app.showToast('请输入正确手机号码')
    } else if (!value.name) {
      return app.showToast('请输入公司名称')
    } else if (!value.jop) {
      return app.showToast('请输入职位')
    }
    return true
  },
  onSubmit(e) {
    console.log(e)
    const { value } = e.detail
    if (this.valid(value)) {
      const { user } = this.data
      updateCompanyInfo({
        name: value.name,
        headerphoto: this.data.avatar,
        job: value.jop,
        logo: user.Logo,
        staffsize: user.StaffSize,
        intro: user.Intro,
        workhours: user.WorkHours,
        resttime: user.RestTime,
        overtime: user.OverTime,
        welfare: user.WelfareList.join(','),
        album: user.AlbumList.map(item => item.Img).join(','),
      }).then((res) => {
        app.showToast('更新成功', () => {
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
      user: app.globalData.hrInfo,
      roleInfo: app.globalData.roleInfo,
      avatar: app.globalData.hrInfo.HeaderPhoto,
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
