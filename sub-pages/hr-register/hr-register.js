const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatar: '',
  },
  valid(value) {
    if (!this.data.avatar) {
      return app.showToast('请上传头像')
    } else if (!value.name) {
      return app.showToast('请输入姓名')
    } else if (!value.company) {
      return app.showToast('请输入公司名称')
    } else if (!value.jop) {
      return app.showToast('请输入职位')
    }
    return true
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
  onSubmit(e) {
    console.log(e)
    const { value } = e.detail
    console.log(value)
    if (this.valid(value)) {
      let formData = {
        avatar: this.data.avatar,
        name: value.name,
        longCompany: value.company,
        jop: value.jop,
      }
      wx.navigateTo({
        url: `/sub-pages/hr-account/hr-account?formData=${JSON.stringify(formData)}`,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.hideHomeButton()
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
