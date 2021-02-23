const app = getApp()
import { requestLetter } from '../../api/hr/message'
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
  },
  onNavTo(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/article/article?id=${id}`,
    })
  },
  getSingleLists: function (pageNum = 1) {
    this.setData({
      loadData: false,
      nomore: false,
      loading: true,
      showLoadButton: true,
    })
    requestLetter({
      pageindex: pageNum,
      pagesize: 10,
    })
      .then((res) => {
        console.log(res)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSingleLists()
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
    this.data.pageNum != 0 && this.getSingleLists()
  },
})
