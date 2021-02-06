const app = getApp()
import { updateCompanyInfo } from '../../api/hr/company'
import { requestCompanyFilter } from '../../api/config'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    value: '1',
    arr: [
      '0-20人',
      '20-99人',
      '100-499人',
      '500-999人',
      '1000-9999人',
      '10000人以上',
    ],
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    })
  },
  onClick(event) {
    const { name } = event.currentTarget.dataset
    this.setData({
      value: name,
    })
  },
  onSubmit() {
    const { user } = this.data
    updateCompanyInfo({
      name: user.Name,
      headerphoto: user.HeaderPhoto,
      job: user.Job,
      logo: user.Logo,
      staffsize: this.data.value,
      intro: user.Intro,
      workhours: user.WorkHours,
      resttime: user.RestTime,
      overtime: user.OverTime,
      welfare: user.WelfareList.join(','),
      album: user.AlbumList.map((item) => item.Img).join(','),
    }).then((res) => {
      app.showToast('更新成功', () => {
        wx.navigateBack()
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: app.globalData.hrInfo,
    })
    requestCompanyFilter().then((res) => {
      console.log(res)
      this.setData({
        arr: res.data[0].keyvalue,
        value: app.globalData.hrInfo.StaffSize,
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
})
