const app = getApp()
import { requestDetailById, postReleaseJop } from '../../api/hr/releaseManage'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    initData: false,
    data: null,
    id: -1,
    content: '',
    position: null,
    show: false,
    type: ['社招', '实习生招聘', '兼职招聘'],
    typeSelected: ['社招'],
    searchKey: '',
    address: null,
    ad_info: null,
    business_area: null,
    housenumber: '',
  },
  onInput(e) {
    this.setData({
      housenumber: e.detail.value,
    })
  },
  onTypeChange(e) {
    console.log(e)
    const value = e.detail
    this.setData({
      typeSelected: value.length ? [value[value.length - 1]] : [],
    })
  },
  onNavTo(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({
      url,
    })
  },
  onMap() {
    const temp = {
      success: (res) => {
        console.log(res)
        this.setData({
          address: res,
        })
        app.mapInstance.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude,
          },
          success: (res) => {
            console.log('工作地点解析' ,res)
            this.setData({
              ad_info: res.result.address_component,
              business_area: res.result.address_reference.business_area,
            })
          }
        })
      },
      fail: () => {
        console.log('fail')
        app.getLocation().then((res) => {
          console.log(res)
        })
      },
    }
    if (this.data.address) {
      temp.latitude = this.data.address.latitude
      temp.longitude = this.data.address.longitude
    }
    wx.chooseLocation(temp)
  },
  valid() {
    if (!this.data.position) {
      return app.showToast('请输入职位名称')
    } else if (!this.data.content) {
      return app.showToast('请输入职位描述')
    } else if (!this.data.address || !this.data.address.address) {
      return app.showToast('请选择工作地点')
    } else if (!this.data.housenumber) {
      return app.showToast('请输入门牌号')
    }
    return true
  },
  onSubmit() {
    const { id } = this.data
    if (this.valid()) {
      const formData = {
        position: this.data.position,
        desc: this.data.content,
        type: this.data.typeSelected[0],
        address: this.data.address,
        housenumber: this.data.housenumber,
        province: this.data.ad_info.province,
        city: this.data.ad_info.city,
        district: this.data.ad_info.district,
      }
      wx.navigateTo({
        url: `/sub-pages/hr-releaseJopRequire/hr-releaseJopRequire?id=${id}&formData=${JSON.stringify(
          formData
        )}`,
      })
    }
  },
  onClick() {
    this.setData({
      show: true,
    })
  },
  onClose() {
    this.setData({ show: false })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id || -1,
    })
    if (options.id) {
      this.getDetail(options.id)
    }
  },
  getDetail(id) {
    requestDetailById(id).then((res) => {
      console.log('详情', res)
      const data = res.data
      this.setData({
        data: res.data,
        position: {
          Name: data.JName,
        },
        content: data.Desc,
        address: {
          address: data.Address,
          name: data.WorkPlace,
          latitude: Number(data.Latitude),
          longitude: Number(data.Longitude),
        },
        housenumber: data.HouseNumber,
        typeSelected: [data.Type]
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
  onShow: function () {
    if (
      app.globalData.selectPostion.length &&
      app.globalData.selectPostion[2]
    ) {
      this.setData({
        position: app.globalData.selectPostion[2],
        searchKey: '',
      })
    } else if (app.globalData.searchKey) {
      this.setData({
        searchKey: app.globalData.searchKey || '',
      })
    }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
