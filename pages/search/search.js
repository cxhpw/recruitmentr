const app = getApp()
import { Debounce } from '../../utils/util'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: ['搜职位', '搜公司'],
    typeIndex: 0,
    list: [{}, {}, {}, {}],
    buttontext: '加载中..',
    loading: false,
    pageNum: 1,
    loadData: false,
    nomore: false,
    showLoadButton: false,
  },
  onTypeTap(e) {
    const { index } = e.currentTarget.dataset
    this.setData({
      typeIndex: index,
    })
  },
  onSearch: Debounce(function (e) {
    console.log(e)
    this.setData(
      {
        key: e.detail,
      },
      () => {
        this.getSingleLists(1)
      }
    )
  }, 250),
  getSingleLists: function (pageNum = 1) {
    const { type } = this.data
    if (this.data.key == '') {
      this.setData({
        list: [],
        nomore: false,
        showLoadButton: false,
      })
      return
    }
    var temp = {
      apiname: 'getworkslist',
      pageNum: pageNum,
      pageSize: 10,
    }
    this.setData({
      loading: true,
      showLoadButton: true,
    })
    app.request({
      url: app.api.host + 'Include/Weixin/wechatdata',
      data: temp,
      success: (res) => {
        console.log('=======', res)
        if (res.data.ret == 'success') {
          var data = res.data.datalist
          this.setData({
            init: true,
            previewImage: data.map((item) => item.CertImgUrl),
          })

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
  onNavTo(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: ``,
    })
  },
  onFilterTap() {
    wx.navigateTo({
      url: `/pages/filter/filter`,
    })
  },
  onAreaTap() {
    wx.navigateTo({
      url: `/pages/area/area`,
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
  onReachBottom: function () {
    this.data.pageNum != 0 && this.getSingleLists(this.data.pageNum + 1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
