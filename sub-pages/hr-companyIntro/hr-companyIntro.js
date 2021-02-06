import { updateCompanyInfo } from '../../api/hr/company'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    safeArea: app.globalData.safeArea ? 'safeArea' : '',
    content: '',
    user: app.globalData.hrInfo,
  },
  onEditorReady() {
    wx.createSelectorQuery()
      .select('#editor')
      .context((res) => {
        this.editorCtx = res.context
        this.editorCtx.setContents({
          html: this.data.content,
        })
      })
      .exec()
  },
  onInput(e) {
    this.setData({
      content: e.detail.value,
    })
  },
  onSubmit() {
    const { user } = this.data
    this.editorCtx.getContents({
      success: (res) => {
        console.log(res.html)
        this.setData({
          content: res.html,
        })
        updateCompanyInfo({
          name: user.Name,
          headerphoto: user.HeaderPhoto,
          job: user.Job,
          logo: user.Logo,
          staffsize: user.StaffSize,
          intro: res.html,
          workhours: user.WorkHours,
          resttime: user.RestTime,
          overtime: user.OverTime,
          welfare: user.WelfareList.join(','),
          album: user.AlbumList.map((item) => item.Img).join(','),
        }).then((res) => {
          app.showToast(res.data.msg, () => {
            wx.navigateBack()
          })
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user: app.globalData.hrInfo,
      content: app.globalData.hrInfo.Intro,
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
  onReachBottom: function () {}
})
