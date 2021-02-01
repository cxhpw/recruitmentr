const app = getApp()
import { requestMessageDetailById } from '../../api/message'
import { postResumeToHr } from '../../api/user/resume'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    role: null,
    id: -1,
    message: [],
    card: [],
    init: false
  },
  onSubmitResume() {
    if (this.data.card.IsSendResume == 'True') {
      return
    }
    postResumeToHr({
      rid: this.data.card.RID,
      status: 99,
    }).then((res) => {
      console.log('发送简历', res)
      app.showToast(res.data.msg, () => {})
    })
  },
  onNavTo(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({
      url,
    })
  },
  onPhoneCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.card.Phone,
    })
  },
  getList: function (pageNum = 1) {
    this.setData({
      loading: true,
    })
    requestMessageDetailById({
      pageindex: pageNum,
      pagesize: 10,
      id: this.data.id,
    })
      .then((res) => {
        console.log('聊天室信息', res)
        if (res.data.ret == 'success') {
          var data = res.data.dataList
          if (pageNum == 1) {
            this.setData({
              card: res.data.data,
            })
          }
          if (res.data.TotalCount - 10 * (pageNum - 1) <= 10) {
            this.setData({
              nomore: true,
              buttontext: '暂无更多数据',
              loading: false,
              pageNum: 0,
            })
          } else {
            this.setData({
              buttontext: '加载中..',
              loading: true,
              pageNum: pageNum,
            })
          }

          if (res.data.TotalCount > 0) {
            this.setData({
              list: pageNum == 1 ? data : this.data.list.concat(data),
              nomore: false,
            })
          } else {
            this.setData({
              list: [],
              nomore: true,
            })
          }
        } else {
          this.setData({
            list: [],
            nomore: true,
          })
        }
      })
      .catch(() => {
        this.setData({
          list: [],
          nomore: true,
        })
      }).finally(() => {
        this.setData({
          init: true
        })
      })
  },
  onClose() {},
  onSuccess() {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getRoleInfos().then((res) => {
      this.setData({
        role: res.data,
      })
    })
    this.setData(
      {
        id: options.id,
      },
      () => {
        this.getList()
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
