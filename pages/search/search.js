const app = getApp()
import { Debounce } from '../../utils/util'
import { requestCompanyList } from '../../api/company'
import { requestJopsList } from '../../api/jobs'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchKey: '',
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
        searchKey: e.detail,
      },
      () => {
        this.getSingleLists(1)
      }
    )
  }, 250),
  getSingleLists: function (pageNum = 1) {
    const { typeIndex } = this.data
    if (this.data.searchKey == '') {
      this.setData({
        list: [],
        nomore: false,
        showLoadButton: false,
      })
      return
    }
    this.setData({
      loading: true,
      showLoadButton: true,
    })
    let requestList = () => {}
    let temp = {
      pageindex: pageNum,
      pagesize: 10,
      name: this.data.searchKey
    }
    if (typeIndex == 0) {
      requestList = requestJopsList
      temp = Object.assign(temp, {
      })
    } else {
      requestList = requestCompanyList
      temp = Object.assign(temp, {})
    }
    requestList(temp).then((res) => {
      console.log('搜索结果')
    })
    // app.request({
    //   url: app.api.host + 'Include/Weixin/wechatdata',
    //   data: temp,
    //   success: (res) => {
    //     console.log('=======', res)
    //     if (res.data.ret == 'success') {
    //       var data = res.data.datalist
    //       this.setData({
    //         init: true,
    //         previewImage: data.map((item) => item.CertImgUrl),
    //       })

    //       if (res.data.TotalCount - 10 * (pageNum - 1) <= 10) {
    //         this.setData({
    //           nomore: true,
    //           buttontext: '暂无更多数据',
    //           loading: false,
    //           pageNum: 0,
    //         })
    //       } else {
    //         this.setData({
    //           buttontext: '加载中..',
    //           loading: true,
    //           pageNum: pageNum,
    //         })
    //       }

    //       if (res.data.TotalCount > 0) {
    //         this.setData({
    //           list: pageNum == 1 ? data : this.data.list.concat(data),
    //           nomore: false,
    //         })
    //       } else {
    //         this.setData({
    //           list: [],
    //           nomore: true,
    //         })
    //       }
    //     } else {
    //       this.setData({
    //         list: [],
    //         nomore: true,
    //       })
    //     }
    //   },
    // })
  },
  onNavTo(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: ``,
    })
  },
  onFilterTap() {
    if (this.data.typeIndex) {
      // 公司筛选
      // wx.navigateTo({
      //   url: `/pages/filter/filter`,
      // })
    } else {
      // 职位筛选
      wx.navigateTo({
        url: `/pages/filter/filter`,
      })
    }
    
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
