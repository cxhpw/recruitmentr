const app = getApp()
import { requestDetailById } from '../../api/hr/resume'
import { postMessage } from '../../api/hr/chatroom'
import { postCollect } from '../../api/hr/collect'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    data: {},
    safeArea: app.globalData.safeArea,
    html: `根据产品需求，搭建web后端框架，完成设计文档；<br> 
      参与系统架构及系统稳定性、可扩展性设计；<br>
      负责后端通用基础组件、开发框架的研发建设;`,
  },
  onCollect(e) {
    const { id } = e.currentTarget.dataset
    postCollect(id).then((res) => {
      app.showToast(res.data.msg, () => {
        if (res.data.ret == 'success') {
          this.setData({
            [`data.FavStatus`]: this.data.data.FavStatus == 1 ? 99 : 1,
          })
        }
      })
    })
  },
  getDetail(id) {
    requestDetailById(id).then((res) => {
      this.setData({
        data: res.data,
      })
    })
  },
  onClick() {
    const works = this.data.data.WorkExList.slice()
    works.sort((a, b) => {
      return new Date(a.StartTime).getTime() - new Date(b.StartTime).getTime()
    })
    const time = works.length
      ? new Date().getFullYear() - works[0].StartTime.split('.')[0]
      : ''
    postMessage(this.data.id).then((res) => {
      console.log(res)
      wx.navigateTo({
        url: `/pages/chatroom/chatroom?id=${res.data.ChatRoomID}&time=${time}`,
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
    })
    this.getDetail(options.id)
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
  onShareAppMessage: function () {
    const { data } = this.data
    return {
      title: `${data.Name}的简历`,
      path: `/pages/resume/resume?id=${data.AutoID}&`,
    }
  },
})
