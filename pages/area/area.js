const app = getApp()
import { requestList } from '../../api/hr/resume'
import { requestRegion, requestRegionById } from '../../api/region'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    province: [],
    city: [],
    Ccode: 0,
    qv: {},
    Pcode: 0,
    pindex: 0,
    cindex: 0,
  },
  onPTap(e) {
    const { code, index } = e.currentTarget.dataset
    this.setData(
      {
        Pcode: code,
        pindex: index,
      },
      () => {
        requestRegionById(code).then((res) => {
          console.log(res)
          this.setData({
            city: res.data.dataList,
          })
        })
      }
    )
  },
  onCTap(e) {
    const { code, index } = e.currentTarget.dataset
    const { province, pindex, city } = this.data
    app.globalData.filterArea = [province[pindex], city[index]]
    getCurrentPages()[getCurrentPages().length - 2].setData({
      city: [province[pindex], city[index]],
    })
    this.setData(
      {
        Ccode: code,
        cindex: index,
      },
      () => {
        wx.navigateBack()
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('areaLoad', options)
    requestRegionById().then((res) => {
      console.log(res)
      let pindex = -1
      let Pcode = this.data.Pcode
      if (app.globalData.filterArea.length) {
        requestRegionById(app.globalData.filterArea[0].RegionCode).then(
          (res) => {
            this.setData({
              city: res.data.dataList,
              Ccode: app.globalData.filterArea[1].RegionCode,
            })
          }
        )
        for (let i = 0; i < res.data.dataList.length; i++) {
          const element = res.data.dataList[i]
          if (element.RegionCode === app.globalData.filterArea[0].RegionCode) {
            pindex = i
          }
        }
        Pcode = app.globalData.filterArea[0].RegionCode
      }

      this.setData({
        province: res.data.dataList,
        Pcode,
        pindex,
      })
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
