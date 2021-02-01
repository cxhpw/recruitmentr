const app = getApp()
import { requestCompanyDetailById } from '../../api/company'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    html: '',
    form: null,
  },
  onMap() {
    const { Latitude, Longitude, WorkPlace, Address } = this.data.form
    wx.openLocation({
      latitude: Number(Latitude),
      longitude: Number(Longitude),
      name: WorkPlace,
      address: Address,
      scale: 18,
    })
  },
  getDetail(id) {
    requestCompanyDetailById(id).then((res) => {
      console.log('公司详情', res)
      let html = res.data.Intro
      if (res.data.Intro.length > 150) {
        html = html.substr(0, 150) + '...'
      }

      this.setData({
        data: res.data,
        html,
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id)
    this.setData({
      form: JSON.parse(options.formData),
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
