const app = getApp()
import { requestList } from '../../api/interviewRecord'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    tabs: [
      { title: '全部', value: 0 },
      { title: '待接受', value: 1 },
      { title: '待面试', value: 10 },
      { title: '已面试', value: 99 },
      { title: '已拒绝', value: 100 },
    ],
    lists: [],
  },
  onChange(e) {
    console.log(e)
    this.setData(
      {
        active: e.detail.index,
      },
      () => {
        this.getLists()
      }
    )
  },
  initList() {
    var lists = []
    for (var i = 0; i < this.data.tabs.length; i++) {
      lists[i] = {}
      lists[i].pageNum = 1
      lists[i].loading = true
      lists[i].nomore = false
      lists[i].init = false
      lists[i].data = []
      lists[i].buttontext = '加载中...'
      lists[i].loadData = false
    }
    this.setData({
      initList: true,
      lists,
    })
    return Promise.resolve()
  },
  getLists(pageNum = 1) {
    const { active, lists, tabs } = this.data
    requestList({
      pageindex: pageNum,
      pagesize: 10,
      status: tabs[active].value,
    })
      .then((res) => {
        if (res.data.ret == 'success') {
          var data = res.data.dataList
          this.setData({
            loadData: true,
            [`lists[${active}].init`]: true,
          })

          if (res.data.TotalCount - 10 * (pageNum - 1) <= 10) {
            this.setData({
              [`lists[${active}].moreButton`]: true,
              [`lists[${active}].buttontext`]: '已经没有更多订单了',
              [`lists[${active}].loading`]: false,
              [`lists[${active}].pageNum`]: 0,
              [`lists[${active}].loadData`]: true,
            })
          } else {
            this.setData({
              [`lists[${active}].buttontext`]: '加载中..',
              [`lists[${active}].loading`]: true,
              [`lists[${active}].pageNum`]: pageNum,
            })
          }

          if (res.data.TotalCount > 0) {
            this.setData({
              [`lists[${active}].data`]:
                pageNum == 1 ? data : lists[active].data.concat(data),
              [`lists[${active}].loadData`]: true,
            })
          } else {
            this.setData({
              [`lists[${active}].data`]: [],
              [`lists[${active}].nomore`]: true,
            })
          }
        } else {
          this.setData({
            [`lists[${active}].data`]: [],
            [`lists[${active}].nomore`]: true,
          })
        }
      })
      .catch(() => {
        this.setData({
          [`lists[${active}].data`]: [],
          [`lists[${active}].nomore`]: true,
        })
      })
  },
  onNavTo(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/sub-pages/hr-interviewDetail/hr-interviewDetail?id=${id}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initList().then(() => {
      this.getLists()
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
