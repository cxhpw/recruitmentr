const app = getApp()
import { requestList } from '../../api/hr/talked'
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
    buttontext: '加载中',
  },
  onNavTo(e) {
    const { chatid, uid } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/resume/resume?id=${uid}`,
    })
  },
  getList: function (pageNum = 1) {
    this.setData({
      loading: true,
    })
    requestList({
      pageNum: pageNum,
      pageSize: 10,
    })
      .then((res) => {
        console.log('沟通列表', res)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
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
    this.data.pageNum != 0 && this.getList(this.data.pageNum + 1)
  }
})
