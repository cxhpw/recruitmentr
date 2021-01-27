const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    title: '',
    field: '',
    placeholder: '',
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
  onSubmit(e) {
    console.log(e)
    const page = getCurrentPages()[getCurrentPages().length - 2]
    this.editorCtx.getContents({
      success: (res) => {
        console.log(res.html)
        page.setData({
          [`${this.data.field}`]: res.html,
        })
        wx.navigateBack()
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      content: options.content || '',
      field: options.field,
      title: options.title,
      placeholder: options.placeholder
        ? options.placeholder
        : options.field == 'workScore'
        ? '填写完整、有吸引力的工作业绩，有助于您更多地吸引Boss的关注'
        : '1、主要负责新员工入职培训\n2、分析制定员工每个月个人销售业绩；',
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
