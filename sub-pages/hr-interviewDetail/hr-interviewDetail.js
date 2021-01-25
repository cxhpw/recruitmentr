const app = getApp()
import { requestDetailById } from '../../api/interviewRecord'
import { postResumeRemark } from '../../api/hr/resume'
import { requestConfig } from '../../api/config'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: -1,
    data: {},
    show: false,
    labels: [
      '入职',
      '需要二面',
      '不通过',
      '牛人没来面试',
      '待定',
      '待回复',
      '面试通过',
      '淘汰',
    ],
    labelsSelected: [],
    content: '',
  },
  onClose() {
    const { data } = this.data
    this.setData({
      cotnent: data.Remark ? data.Remark : '',
      labelsSelected: data.Result ? data.Result.split(',') : [],
    })
    this.setData({
      show: false,
    })
  },
  onClick() {
    wx.navigateTo({
      url: `/sub-pages/hr-invitePage/hr-invitePage?id=${this.data.id}`,
    })
  },
  onLabelsChange(e) {
    this.setData({
      labelsSelected: e.detail,
    })
  },
  onRemarkTap() {
    this.setData({
      show: true,
    })
  },
  getDetail(id) {
    requestDetailById(id).then((res) => {
      this.setData({
        data: res.data,
        content: res.data.Remark,
        labelsSelected: res.data.Result.split(',')
      })
    })
  },
  onNavTo: function (e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({
      url,
    })
  },
  onPhoneCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.data.Phone,
    })
  },
  onInput(e) {
    this.setData({
      content: e.detail.value,
    })
  },
  onConfirm() {
    const { data, content } = this.data
    postResumeRemark({
      action: 'modify',
      id: data.AutoID,
      remark: content,
      result: this.data.labelsSelected.join(','),
    }).then((res) => {
      console.log(res)
      this.getDetail(this.data.id)
    }).finally(() => {
      this.setData({
        show: false,
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    requestConfig('msbz').then((res) => {
      console.log('===', res)
      this.getDetail(options.id)
      this.setData({
        labels: res.data.dataList.map((item) => item.Title),
      })
    })
    // this.getDetail(options.id)
    this.setData({
      id: options.id,
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
