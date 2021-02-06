const app = getApp()
import { requestCompanyList } from '../../api/company'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    buttontext: '加载中..',
    loading: true,
    pageNum: 1,
    loadData: false,
    nomore: false,
    sizeValue: [],
    industryValue: [],
  },
  onNavTo(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({
      url,
    })
  },
  getSingleLists: function (pageNum = 1) {
    const { industryValue, sizeValue, city } = this.data
    this.setData({
      loadData: false,
      nomore: false,
      loading: true,
      showLoadButton: true,
    })
    requestCompanyList({
      pageindex: pageNum,
      pagesize: 10,
      area: city[1].RegionName,
      staffsize: sizeValue.join(','),
      industry: industryValue.join(','),
      action: 'recommend',
    })
      .then((res) => {
        console.log('搜索结果', res)
        if (res.data.ret == 'success') {
          var data = res.data.dataList
          this.setData({
            init: true,
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
      })
      .catch(() => {
        this.setData({
          nomore: true,
        })
      })
      .finally(() => {
        this.setData({
          loadData: true,
          showLoadButton: false,
        })
      })
  },
  onFilterTap() {
    const { sizeValue, industryValue } = this.data
    wx.navigateTo({
      url: `/pages/filter/filter?type=company`,
      success: function (res) {
        res.eventChannel.emit('filterValue', {
          sizeValue,
          industryValue,
        })
      },
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
  onLoad: function (options) {
    this.setData({
      city: !app.globalData.currentLocation
        ? app.globalData.staticArea
        : [
            { RegionName: app.globalData.currentLocation.province },
            { RegionName: app.globalData.currentLocation.city },
          ],
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const { sizeValue, industryValue } = this.data
    this.setData({
      totalFilterCount: sizeValue.length + industryValue.length,
    })
    this.getSingleLists()
  },

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
})
