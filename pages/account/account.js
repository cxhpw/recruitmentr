import { getTimeStr, encrypt } from '../../utils/util'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    header: {
      'Content-Type': 'multipart/form-data',
    },
    formData: {
      apiname: 'uploadbytool',
      customrdsession: wx.getStorageSync('LogiSessionKey'),
      encrypttime: encodeURIComponent(
        encrypt(getTimeStr(Date.now(), 'datetime', true))
      ),
    },
    fileList: [],
    loadData: false,
    content: '',
    showSelect: true,
    showRemoveIcon: true,
    region: [],
    date: '',
  },
  /* 图片上传 */
  onBefore() {
    wx.showLoading({
      mask: true,
    })
  },
  onSuccess(e) {
    var { file, fileList } = e.detail
    var { res } = file
    var { type } = e.currentTarget.dataset

    this.setData(
      {
        [`fileList`]: fileList
          .filter((item) => {
            return item.status == 'done'
          })
          .map((item) => {
            return {
              uid: item.uid,
              url: item.url,
            }
          }),
      },
      () => {
        wx.hideLoading()
        this.setData({
          showSelect: this.data[`fileList`].length >= 4 ? false : true,
        })
      }
    )
  },
  onComplete(e) {
    console.log('onComplete', e)
    wx.hideLoading()
  },
  onPreview(e) {
    var { type } = e.currentTarget.dataset
    console.log('onPreview', e)
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  onRemove(e) {
    var { type } = e.currentTarget.dataset
    const { file, fileList } = e.detail
    console.log('remove', e)
    var temp = this.data[`fileList`].filter((n) => {
      return n.uid != file.uid
    })

    console.log('temp', temp)
    this.setData({
      [`fileList`]: temp,
      showSelect: temp.length < 4 ? true : false,
    })
  },
  onSubmit() {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url: app.api.host + 'Include/Weixin/wechatdata',
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
