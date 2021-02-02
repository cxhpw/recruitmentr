const app = getApp()
import { postResumeRemark } from '../../api/hr/resume'
import { requestDetailById } from '../../api/interviewRecord'
import { requestDetailById as requestResumeDetailById } from '../../api/hr/resume'
import { requestJopDetailById } from '../../api/jobs'
import { getTimeStr } from '../../utils/util'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    position: null,
    data: {},
    date: '',
    initDate: '',
    id: -1, //求职ID
    activeDate: [],
    remark: '',
    show: false,
    mobile: '',
    jopID: 0, // 岗位ID
    resumeDetail: null,
    jopDetail: null,
    address: '',
    workPlace: '',
    houseNumber: '',
    time: '00:00',
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
      const {
        data,
        position,
        date,
        remark,
        jopDetail,
        resumeDetail,
        time,
        mobile,
      } = this.data
      let temp = {}
      if (!this.data.type) {
        temp = {
          action: 'add',
          jid: position ? position.AutoID : data.JID,
          jsid: data.UserID,
          phone: mobile || data.Phone,
          time: `${date} ${time}`,
          remark: remark,
        }
      } else {
        temp = {
          action: 'add',
          jid: position ? position.AutoID : jopDetail.AutoID,
          jsid: resumeDetail.AutoID,
          phone: mobile,
          time: `${date} ${time}`,
          remark: remark,
        }
      }
      postResumeRemark(temp).then((res) => {
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
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value,
    })
  },
  getDetail(id) {
    requestDetailById(id).then((res) => {
      this.setData({
        data: res.data,
        address: res.data.Address,
        workPlace: res.data.WorkPlace,
        houseNumber: res.data.HouseNumber,
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
        jopID: options.jopID,
        type: options.type || this.data.type,
        date: getTimeStr(Date.now(), 'date'),
      },
      () => {
        if (!this.data.type) {
          this.getDetail(options.id)
        } else {
          this.setData({
            mobile: app.globalData.roleInfo.Phone,
          })
          Promise.all([
            requestResumeDetailById(this.data.id),
            requestJopDetailById(this.data.jopID),
          ]).then(([resumeDetail, jopDetail]) => {
            console.log('简历信息', resumeDetail)
            console.log('岗位信息', jopDetail)
            this.setData({
              resumeDetail: resumeDetail.data,
              jopDetail: jopDetail.data,
              address: jopDetail.data.Address,
              workPlace: jopDetail.data.WorkPlace,
              houseNumber: jopDetail.data.HouseNumber,
            })
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
