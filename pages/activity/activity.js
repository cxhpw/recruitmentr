const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    pageNum: 1,
    loadData: false,
    nomore: false,
    list: [],
    buttontext: '加载中'
  },
  getList: function (pageNum = 1) {
    var temp = {
      apiname: 'getworkslist',
      pageNum: pageNum,
      pageSize: 10,
    }
    this.setData({
      loading: true,
    })
    app.request({
      url: app.api.host + 'Include/Weixin/wechatdata',
      data: temp,
      success: (res) => {
        console.log('=======', res)
        if (res.data.ret == 'success') {
          var data = res.data.datalist

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
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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
