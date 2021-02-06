const app = getApp()
import { requestDetailById, postReleaseJop } from '../../api/hr/releaseManage'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: -1,
    data: {},
    html: '',
    isMore: false,
  },
  onMore() {
    this.setData({
      html: this.data.data.Desc,
      isMore: false,
    })
  },
  onMapTap() {
    const { data } = this.data
    wx.openLocation({
      latitude: Number(data.Latitude),
      longitude: Number(data.Longitude),
      name: data.WorkPlace,
      address: data.Address,
      scale: 18,
    })
  },
  getDetail(id) {
    requestDetailById(id).then((res) => {
      console.log('详情', res)
      let html = res.data.Desc
      let isMore = this.data.isMore
      // if (res.data.Desc.length > 150) {
      //   html = html.substr(0, 150) + '...'
      //   isMore = true
      // }
      this.setData({
        data: res.data,
        html,
        isMore,
      })
    })
  },
  onClose() {
    postReleaseJop({
      action: 'close',
      id: this.data.id,
    }).then((res) => {
      app.showToast(res.data.msg, () => {
        this.getDetail(this.data.id)
      })
    })
  },
  onOpen() {
    postReleaseJop({
      action: 'open',
      id: this.data.id,
    }).then((res) => {
      app.showToast(res.data.msg, () => {
        this.getDetail(this.data.id)
      })
    })
  },
  onEdit() {
    wx.navigateTo({
      url: `/sub-pages/hr-releaseBaseInfo/hr-releaseBaseInfo?id=${this.data.id}&type=edit`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
    })
    this.getDetail(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.globalData.isRef &&
      this.getDetail(this.data.id) &&
      (app.globalData.isRef = false)
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
})
