import WeCropper from '../../we-cropper/we-cropper.js'
import { getTimeStr, encrypt } from '../../utils/util'
const app = getApp()
const config = app.globalData.config

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50

Page({
  data: {
    statusBarHeight: 0,
    cropperOpt: {
      id: 'cropper',
      targetId: 'targetCropper',
      pixelRatio: device.pixelRatio,
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300,
      },
      boundStyle: {
        color: '#04b00f',
        mask: 'rgba(0,0,0,0.8)',
        lineWidth: 2,
      },
      statusBarHeight: device.statusBarHeight,
    },
  },
  touchStart(e) {
    this.cropper.touchStart(e)
  },
  touchMove(e) {
    console.log(e)
    this.cropper.touchMove(e)
  },
  touchEnd(e) {
    this.cropper.touchEnd(e)
  },
  getCropperImage() {
    const _self = this
    this.cropper.getCropperImage(function (path, err) {
      if (err) {
        wx.showModal({
          title: '温馨提示',
          content: err.message,
        })
      } else {
        console.log(path)
        var uploadTask = wx.uploadFile({
          url: app.api.wxhost + 'Include/Ajax/uploadfilenew.aspx',
          filePath: path,
          name: 'uploadfile',
          formData: {
            customrdsession: wx.getStorageSync('LogiSessionKey'),
            encrypttime: encodeURIComponent(
              encrypt(getTimeStr(Date.now(), 'datetime', true))
            ),
          },
          header: {
            'Content-Type': 'multipart/form-data',
          },
          success: function (res) {
            var data = JSON.parse(res.data)
            getCurrentPages()[getCurrentPages().length - 2].setData({
              avator: data.filename,
              avatar: data.filename,
            })
            wx.navigateBack()
            // _self.uploadUserInfo(data.filename)
          },
          fail: function (err) {
            console.error('图片上传失败', err)
          },
          complete: function () {
            wx.hideLoading()
          },
        })
        uploadTask.onProgressUpdate((res) => {
          wx.showLoading({
            title: `${res.progress}%`,
            mask: true,
          })
        })
      }
    })
  },
  uploadUserInfo(avatar) {
    const { userInfo } = this.data
    app.request(
      {
        method: 'POST',
        url: app.api.wxhost + 'include/weixin/wechatdata',
        data: {
          apiname: 'modifyiuserinfo',
          HeaderPhoto: avatar,
          Remark: userInfo.Remark,
          RealName: userInfo.RealName,
          Mobile: userInfo.Mobile,
          Address: userInfo.Address,
        },
        success: (res) => {
          app.getStoreInfo()
          app.showToast(res.data.msg, () => {
            wx.navigateBack()
          })
        },
      },
      true
    )
  },
  uploadTap() {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值
        self.cropper.pushOrign(src)
      },
    })
  },
  onLoad(option) {
    const { cropperOpt } = this.data

    cropperOpt.boundStyle.color = '#04b00f'

    this.setData({
      cropperOpt,
      userInfo: app.globalData.userInfo,
    })
    wx.getSystemInfo({
      success: (res) => {
        var ios = !!(res.system.toLowerCase().search('ios') + 1)
        this.setData({
          ios: ios,
          statusBarHeight: res.statusBarHeight,
        })
      },
    })
    if (option.src) {
      cropperOpt.src = option.src
      this.cropper = new WeCropper(cropperOpt)
        .on('ready', (ctx) => {
          console.log(`wecropper is ready for work!`)
        })
        .on('beforeImageLoad', (ctx) => {
          console.log(`before picture loaded, i can do something`)
          console.log(`current canvas context:`, ctx)
          wx.showToast({
            title: '上传中',
            icon: 'loading',
            duration: 20000,
          })
        })
        .on('imageLoad', (ctx) => {
          console.log(`picture loaded`)
          console.log(`current canvas context:`, ctx)
          wx.hideToast()
        })
        .on('beforeDraw', (ctx, instance) => {
          console.log('beforeDraw', instance)
          // console.log(`before canvas draw,i can do something`)
          // console.log(`current canvas context:`, ctx)
        })
    }
  },
})
