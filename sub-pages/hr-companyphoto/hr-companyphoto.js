import { getTimeStr, encrypt } from '../../utils/util'
import { updateCompanyInfo } from '../../api/hr/company'
import { getUuid } from '../../utils/util'
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    max: 1,
    safeArea: app.globalData.safeArea ? 'safeArea' : '',
    isLogo: false,
    header: {
      'Content-Type': 'multipart/form-data',
    },
    formData: {
      apiname: 'uploadfile',
      customrdsession: wx.getStorageSync('LogiSessionKey'),
      encrypttime: encodeURIComponent(
        encrypt(getTimeStr(Date.now(), 'datetime', true))
      ),
    },
    user: app.globalData.hrInfo,
    url: app.api.host + '/include/getdata',
    fileList: [],
    loadData: false,
    content: '',
    showSelect: true,
    showRemoveIcon: true,
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
          showSelect:
            this.data[`fileList`].length >= this.data.max ? false : true,
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
      showSelect: temp.length < this.data.max ? true : false,
    })
  },
  onClick() {
    const { user, fileList, isLogo } = this.data
    updateCompanyInfo({
      name: user.Name,
      headerphoto: user.HeaderPhoto,
      job: user.Job,
      logo: isLogo ? fileList[0].url : user.Logo,
      staffsize: user.StaffSize,
      intro: user.Intro,
      workhours: user.WorkHours,
      resttime: user.RestTime,
      overtime: user.OverTime,
      welfare: user.WelfareList.join(','),
      album: !isLogo
        ? fileList.map((item) => item.url).join(',')
        : user.AlbumList.map(item => item.Img).join(','),
    }).then((res) => {
      app.showToast(res.data.msg, () => {
        wx.navigateBack()
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isLogo: options.isLogo || false,
      max: options.max || this.data.max,
      user: app.globalData.hrInfo,
    })
    if (options.isLogo) {
      this.setData({
        fileList: app.globalData.hrInfo.Logo
          ? [{ uid: getUuid(), url: app.globalData.hrInfo.Logo, status: 'done' }]
          : [],
      })
    } else {
      this.setData({
        fileList: app.globalData.hrInfo.AlbumList.length
          ? app.globalData.hrInfo.AlbumList.map((item) => {
              return {
                uid: getUuid(),
                url: item.Img,
                status: 'done'
              }
            })
          : [],
      })
    }

    wx.setNavigationBarTitle({
      title: options.isLogo ? '上传LOGO' : '上传公司图片',
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
