const app = getApp()
import { requestLetter } from '../../api/hr/message'
import { requestMessageList } from '../../api/message'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    role: null,
    active: 0,
    tabs: [
      { title: '消息', value: 0 },
      { title: '站内信', value: 1 },
    ],
  },
  onChatRoomTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/chatroom/chatroom?id=${id}`,
    })
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
  onTabsClick(e) {
    console.log(e)
    wx.navigateTo({
      url: '/sub-pages/hr-interview/hr-interview',
    })
  },
  initList() {
    var listTemp = []
    for (var i = 0; i < this.data.tabs.length; i++) {
      listTemp[i] = {}
      listTemp[i].pageNum = 1
      listTemp[i].loading = true
      listTemp[i].nomore = false
      listTemp[i].init = false
      listTemp[i].data = []
      listTemp[i].buttontext = '加载中...'
      listTemp[i].loadData = false
    }
    this.setData({
      initList: true,
      lists: listTemp,
    })
    return Promise.resolve()
  },
  getLists(pageNum = 1) {
    const { active, lists, tabs } = this.data
    let requestList = () => {}
    if (active == 0) {
      requestList = requestMessageList
    } else {
      requestList = requestLetter
    }
    requestList({
      pageindex: pageNum,
      pagesize: 20,
      status: tabs[active].value,
    })
      .then((res) => {
        console.log('列表', res)
        if (res.data.ret == 'success') {
          var data = res.data.dataList
          this.setData({
            loadData: true,
            [`lists[${active}].init`]: true,
          })

          if (res.data.TotalCount - 10 * (pageNum - 1) <= 10) {
            this.setData({
              [`lists[${active}].moreButton`]: true,
              [`lists[${active}].buttontext`]: '暂无更多数据',
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
      .catch((err) => {
        this.setData({
          [`lists[${active}].data`]: [],
          [`lists[${active}].nomore`]: true,
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      role: app.globalData.roleInfo,
    })

    this.initList().then(() => {
      console.log(213)
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
