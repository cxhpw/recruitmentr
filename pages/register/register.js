import { getTimeStr, encrypt } from '../../utils/util'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    sex: ['男', '女'],
    sexValue: -1,
    identity: ['在校', '应届', '往届'],
    identityValue: -1,
  },
  onSexChange(e) {
    this.setData({
      sexValue: e.detail.value,
    })
  },
  onIdentityChange(e) {
    this.setData({
      identityValue: e.detail.value,
    })
  },
  valid(value) {
    if (!value) {
      return app.showToast('请输入姓名')
    } else if (this.data.sexValue == -1) {
      return app.showToast('请选择性别')
    } else if (this.data.identityValue == -1) {
      return app.showToast('请选择性别')
    }
    return true
  },
  onSubmit(e) {
    console.log('提交', e)
    const { value } = e.detail
    let formData = {}
    if (this.valid(value)) {
      wx.navigateTo({
        url: `./educationExperience/educationExperience?formData=${JSON.stringify(
          formData
        )}`,
      })
    }
  },
  onUpload() {
    const customrdsession = wx.getStorageSync('LogiSessionKey')
    const encrypttime = encodeURIComponent(
      encrypt(getTimeStr(Date.now(), 'datetime', true))
    )
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: (res) => {
        const src = res.tempFilePaths[0]
        console.log(src)
        wx.navigateTo({
          url: `/pages/avatar/avatar?src=${src}`,
        })
        // wx.uploadFile({
        //   url: app.api.host + '/Include/Weixin/wechatdata',
        //   filePath: src,
        //   name: 'uploadfile',
        //   formData: {
        //     apiname: 'uploadbytool',
        //     customrdsession: customrdsession,
        //     encrypttime: encrypttime,
        //   },
        //   header: {
        //     'Content-Type': 'multipart/form-data',
        //   },
        //   success: (res) => {
        //     var data = JSON.parse(res.data)
        //     console.log(data)
        //     if (data.ret == 'success') {
        //       form.avatar = data.filename
        //       this.setState({
        //         form,
        //       })
        //     }
        //   },
        //   fail: function (err) {
        //     console.error('图片上传失败', err)
        //   },
        //   complete: function () {
        //     Taro.hideLoading()
        //   },
        // })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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
