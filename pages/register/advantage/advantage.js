const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    form: {
      content: '',
    },
    content: '',
  },
  onConfirm() {
    this.editorCtx.getContents({
      success: (res) => {
        const html = res.html
        getCurrentPages()[getCurrentPages().length - 2].setData({
          advantage: res.html,
        })
        wx.navigateBack()
      },
    })
  },
  onSubmit(e) {
    this.editorCtx.getContents({
      success: (res) => {
        console.log(res)
        const formData = Object.assign(
          {},
          {
            advantage: res.html,
          },
          this.data.form
        )
        console.log(formData)
        wx.navigateTo({
          url: `../intention/intention?formData=${JSON.stringify(formData)}`,
        })
      },
    })
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      form: options.formData ? JSON.parse(options.formData) : null,
      content: options.content || '',
      type: options.type || '',
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
