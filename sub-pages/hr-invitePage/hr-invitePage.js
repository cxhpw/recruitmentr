const app = getApp()
import { postResumeRemark } from '../../api/hr/resume'
import { requestDetailById } from '../../api/interviewRecord'
import { requestDetailById as requestResumeDetailById } from '../../api/hr/resume'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    position: null,
    data: {},
    date: '',
    id: -1,
    activeDate: [],
    remark: '',
    show: false,
    mobile: '',
  },
  onNavToMobile() {
    wx.navigateTo({
      url: `/sub-pages/hr-editMobile/hr-editMobile?mobile=${this.data.mobile}`,
      events: {
        mobileData: (data) => {
          console.log('----', data)
          this.setData({
            mobile: data.data,
          })
        },
      },
      success: () => {},
    })
  },
  onNavToJop() {
    console.log(123)
    wx.navigateTo({
      url: `/sub-pages/hr-releaseJopName/hr-releaseJopName`,
    })
  },
  valid() {
    if (!this.data.date) {
      return app.showToast('请选择面试时间')
    }
    return true
  },
  onSubmit(e) {
    if (this.valid()) {
      const { data, position, date, remark } = this.data
      postResumeRemark({
        action: 'add',
        jid: position.AutoID || data.JID,
        jsid: data.UserID,
        phone: mobile || data.Phone,
        time: date,
        remark: remark,
      }).then((res) => {
        if (res.data.ret == 'success') {
          this.setData({
            show: true,
          })
        } else {
          app.showToast(res.data.msg)
        }
      })
    }
  },
  onConfirm() {
    this.setData({
      show: false,
    })
    wx.navigateBack()
  },
  onInput(e) {
    this.setData({
      remark: e.detail.value,
    })
  },
  onSelect(e) {
    console.log(e)
    this.setData({
      date: e.detail.date,
    })
  },
  getDetail(id) {
    requestDetailById(id).then((res) => {
      this.setData({
        data: res.data,
        mobile: app.globalData.roleInfo.Phone,
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData(
      {
        id: options.id,
        type: options.type || this.data.type,
      },
      () => {
        if (!this.data.type) {
          this.getDetail(options.id)
        } else {
          requestResumeDetailById(this.data.id).then((res) => {
            console.log('简历详情', res)
          })
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
  onShow: function () {
    if (
      app.globalData.selectPostion.length &&
      app.globalData.selectPostion[2]
    ) {
      this.setData({
        position: app.globalData.selectPostion[2],
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.globalData.selectPostion = []
  },

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
