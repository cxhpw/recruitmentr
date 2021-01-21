// sub-pages/main/main.js
var app = getApp()
var pages = ['订单', '消息', '房源', '我的']
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 0,
    shouldHandleScroll: true,
    scrollHandle: [0, 0, 0, 0],
    canClick: true,
    loadData: false,
  },
  onPageScroll: function (e) {
    var _self = this
    for (
      var i = 0, scrollHandle = _self.data.scrollHandle;
      i < scrollHandle.length;
      i++
    ) {
      if (_self.data.tabIndex == i) {
        scrollHandle[_self.data.tabIndex] = e.scrollTop
      }
    }
    _self.setData({
      scrollHandle: scrollHandle,
    })
  },
  onShareAppMessage: function (e) {
    return {
      title: `柯城社区`,
      // path: `/pages/selectSeat/selectSeat?code=${
      //   this.data.Codes[e.target.dataset.index]
      // }`,
      // imageUrl: '/assets/images/main.jpg',
    }
  },
  cameraTap: function () {
    wx.navigateTo({
      url: '/pages/selectSeat/selectSeat',
    })
  },
  tabSwitch: function (e) {
    var { index } = e.currentTarget.dataset
    switch (index) {
      case 0:
        wx.setNavigationBarTitle({
          title: '柯城人社',
        })
        break
      case 1:
        wx.setNavigationBarTitle({
          title: '消息',
        })
        break
      case 2:
        wx.setNavigationBarTitle({
          title: '我的',
        })
        break
    }
    this.data.tabIndex !== e.currentTarget.dataset.index &&
      this.setData({
        tabIndex: e.currentTarget.dataset.index,
      })
    console.log(e)
    // wx.setNavigationBarTitle({
    //   title: pages[e.currentTarget.dataset.tabIndex]
    // })
    wx.pageScrollTo({
      scrollTop: this.data.scrollHandle[this.data.tabIndex],
      duration: 0,
    })
  },
  indexCompententReachBottomHandle: function () {
    // this.selectComponent("#index").reachBottomHandle();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _self = this
    wx.hideHomeButton()
    this.setData({
      tabIndex: options.tabIndex || this.data.tabIndex,
      mylogin: app.globalData.mylogin,
      loadData: true,
      currentIndex: options.currentIndex || 0,
    })

    app.mylogin = function () {
      _self.setData({
        mylogin: app.globalData.mylogin,
        loadData: true,
        currentIndex: options.currentIndex || 0,
      })
    }
    // wx.setNavigationBarTitle({
    //   title: pages[this.data.tabIndex]
    // })
  },
  onPullDownRefresh: function () {
    console.log(213)
    this.selectComponent('#my').onPullDownRefresh()
  },
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var tabIndex = parseInt(this.data.tabIndex)
    // switch (tabIndex) {
    //   case 2:
    //     this.selectComponent('#my').onReachBottom()
    //     break
    // }
  },
})
