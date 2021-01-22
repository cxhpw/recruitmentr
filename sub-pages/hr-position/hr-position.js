const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    tabs: [{ title: '全部' }, { title: '开放中' }, { title: '已关闭' }],
    lists: [],
    safeArea: app.globalData.safeArea ? 'safeArea' : '',
    initList: false
  },
  onChange(e) {
    console.log(e)
  },
  initList() {
    console.log(213123)
    var lists = []
    for (var i = 0; i < this.data.tabs.length; i++) {
      lists[i] = {}
      lists[i].pageNum = 1
      lists[i].loading = true
      lists[i].nomore = false
      lists[i].init = false
      lists[i].data = [{}, {}, {}]
      lists[i].buttontext = '加载中...'
      lists[i].loadData = false
    }
    this.setData({
      initList: true,
      lists: lists,
    })
    return Promise.resolve()
  },
  getLists(pageNum) {
    const { active, lists, tabs } = this.data
    var temp = {}
    temp.apiname = 'getorderlist'
    temp.pageNum = pageNum
    temp.status = tabs[active].value
    temp.pageSize = 10
    console.log(temp)
    app.request({
      url: app.api.host + 'include/weixin/wechatdata',
      data: temp,
      success: (res) => {
        console.log(res)
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
      },
      complete: function () {
        wx.hideToast()
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initList().then(() => {
      console.log(123123)
      this.getLists(1)
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
