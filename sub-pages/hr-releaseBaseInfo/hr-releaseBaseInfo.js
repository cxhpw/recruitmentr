const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    position: null,
    show: false,
    type: ['社招', '实习生招聘', '兼职招聘'],
    typeSelected: ['社招'],
    searchKey: '',
    address: ''
  },
  onTypeChange(e) {
    console.log(e)
    const value = e.detail
    this.setData({
      typeSelected: value.length ? [value[value.length - 1]] : [],
    })
  },
  onNavTo(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({
      url,
    })
  },
  onMap() {
    wx.chooseLocation({
      success: (res) => {
        console.log(res)
      }
    })
  },
  valid() {
    if (!this.data.position) {
      return app.showToast('请输入职位名称')
    } else if (!this.data.content) {
      return app.showToast('请输入职位描述')
    }
    return true
  },
  onSubmit() {
    if (this.valid()) {
      const formData = {
        position: this.data.position,
        desc: this.data.content,
        type: this.data.typeSelected[0],
      }
      wx.navigateTo({
        url: `/sub-pages/hr-releaseJopRequire/hr-releaseJopRequire?formData=${JSON.stringify(
          formData
        )}`,
      })
    }
  },
  onClick() {
    this.setData({
      show: true,
    })
  },
  onClose() {
    this.setData({ show: false })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (
      app.globalData.selectPostion.length &&
      app.globalData.selectPostion[2]
    ) {
      this.setData({
        position: app.globalData.selectPostion[2],
        searchKey: '',
      })
    } else if (app.globalData.searchKey) {
      this.setData({
        searchKey: app.globalData.searchKey || '',
      })
    }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
