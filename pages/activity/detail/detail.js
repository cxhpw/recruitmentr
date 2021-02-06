const app = getApp()
import {
  requestDetailById,
  requestListByFairId,
  postJobFair,
} from '../../../api/JobFair'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    safeArea: app.globalData.safeArea ? 'safeArea' : '',
    active: 0,
    loading: true,
    pageNum: 1,
    loadData: false,
    nomore: false,
    list: [],
    buttontext: '加载中',
  },
  onShare() {},
  getDetail(id) {
    requestDetailById({
      id: id,
      userid: !app.globalData.mylogin
        ? 0
        : app.globalData.roleInfo.Role == 99
        ? app.globalData.userInfo.AutoID
        : app.globalData.hrInfo.AutoID,
    }).then((res) => {
      console.log('详情', res)
      this.setData({
        data: res.data,
      })
    })
  },
  getList: function (pageNum = 1) {
    this.setData({
      loading: true,
    })
    requestListByFairId({
      pageindex: pageNum,
      pagesize: 10,
      id: this.data.id,
      userid: !app.globalData.mylogin
        ? 0
        : app.globalData.roleInfo.Role == 99
        ? app.globalData.userInfo.AutoID
        : app.globalData.hrInfo.AutoID,
    })
      .then((res) => {
        if (res.data.ret == 'success') {
          var data = res.data.dataList
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
      })
  },
  onNavTo(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/companyDetail/companyDetail?id=${id}`,
    })
  },
  onConfirm() {
    wx.showLoading({
      mask: true,
    })
    postJobFair(this.data.id).then((res) => {
      app.showToast(res.data.msg, () => {
        wx.navigateBack()
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
        role: app.globalData.roleInfo,
      },
      () => {
        this.getList()
      }
    )
    this.getDetail(options.id)
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
  onReachBottom: function () {
    this.data.pageNum != 0 && this.getList(this.data.pageNUm + 1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: this.data.data.Title,
    }
  },
})
