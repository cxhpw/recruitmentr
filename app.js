//app.js
import { getTimeStr, encrypt } from './utils/util'
import { requestUserInfo } from './api/user/user'
import { togglerRole } from './api/user'
import {
  requestResumeFilter,
  requestCompanyFilter,
  requestConfig,
} from './api/config'
import './utils/es6-promise.min.js'
const Wxmap = require('./utils/qqmap-wx-jssdk.min.js')
var mapInstance
global.Promise && (Promise = global.Promise)
var timer
App({
  onLaunch: function () {
    // 展示本地存储能力
    // wx.clearStorage()

    // wx.reLaunch({
    //   url: '/sub-pages/main/main'
    // })
    this.updateAppHandle()
    // 登录
    this.getRoleInfos()
      .then((res) => {
        console.log('授权信息', res)
        requestResumeFilter().then((res) => {
          this.globalData.educationOptions = res.data[0].keyvalue
          this.globalData.salaryOptions = res.data[1].keyvalue
          this.globalData.experienceOptions = res.data[2].keyvalue
          this.globalData.jopStatusOptions = res.data[3].keyvalue
        })
        requestCompanyFilter().then((res) => {
          this.globalData.industryOptions = res.data[1].keyvalue
          this.globalData.companySizeOptions = res.data[0].keyvalue
        })
        Promise.all([
          requestConfig('bzgzsj'), // 公司工作时长
          requestConfig('gsfl'), // 公司福利
          requestConfig('zwlx'), // 求职者类型，全职，实习，兼职
        ]).then(([a, b, c]) => {
          this.globalData.workTimeOptions = a.data.dataList
          this.globalData.welfareOptions = b.data.dataList
          this.globalData.jopTypeOptions = c.data.dataList
        })
        if (res.data.Role === 1) {
          togglerRole(99).then((res) => {
            this.globalData.userType = 'user'
            this.globalData.roleInfo.Role = res.data.Role
          })
        } else {
          requestUserInfo().then((res) => {
            console.log('用户信息')
            this.globalData.userInfo = res.data
            this.globalData.mylogin = true
            this.mylogin()
          })
        }
      })
      .catch((error) => {
        // 未授权
        console.error(error)
      })

    wx.getSystemInfo({
      success: (res) => {
        console.log('系统信息', res)
        this.globalData.systemInfo = res
        let modelmes = res.model
        if (modelmes.search('iPhone X') != -1) {
          this.globalData.safeArea = true
        }
      },
    })
    this.mapInstance = new Wxmap({
      key: 'Z4OBZ-DSDCQ-32Y5R-GLXXC-CFEBO-5DBL3',
    })
    // 获取当前定位，无需微信定位授权
    // mapInstance.getCityList({
    //   success: (res) => {
    //     console.log("城市列表", res)
    //     this.globalData.allCityList = res.
    //   }
    // })
    wx.showLoading({
      mask: true,
    })
    this.getLocation()
      .then((res) => {
        this.globalData.location = res
        this.mapInstance.reverseGeocoder({
          success: (res) => {
            console.log('reverseGeocoder', res)
            this.globalData.currentLocation = res.result.ad_info
            this.globalData.filterArea = this.globalData.staticArea
            // this.globalData.filterArea = [
            //   { RegionName: res.result.ad_info.province },
            //   { RegionName: res.result.ad_info.city },
            // ]
          },
          fail: (err) => {
            console.error(err)
          },
        })
      })
      .catch((err) => {
        this.globalData.filterArea = this.globalData.staticArea
        console.error(err)
      })
      .finally(() => {
        wx.hideLoading()
      })
  },
  onShow: function () {
    console.log('App show')
  },
  checkLoginStatus() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          var code = res.code
          wx.request({
            url: this.api.host + '/include/getdata',
            method: 'POST',
            data: {
              apiname: 'wechatuseropenid',
              code: code,
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            success: (res) => {
              console.log('授权信息', res)
              if (res.data.ret == 'success') {
                wx.setStorageSync('LogiSessionKey', res.data.rdsession)
                if (res.data.codeStatus == 1) {
                  resolve(res)
                }
                reject('会员未授权')
              }
            },
            fail: function (err) {
              console.log('获取登录凭证失败', err)
              reject(err)
            },
          })
        },
      })
    })
  },
  getRoleInfos: function () {
    return new Promise((resolve, reject) => {
      this.request({
        url: this.api.host + '/include/getdata',
        data: {
          apiname: 'getuserinfo',
        },
        success: (res) => {
          if (res.data.ret == 'success') {
            this.globalData.roleInfo = res.data
            this.globalData.auth = true
            resolve(res)
            if (typeof this.mylogin == 'function') {
              this.mylogin()
            }
          } else {
            reject('未授权')
          }
        },
      })
    })
  },
  setFilterData(data) {
    this.globalData.filterData = data
  },
  mylogin: () => {},
  globalData: {
    auth: false,
    isRef: false,
    location: null,
    roleInfo: {},
    userInfo: {},
    hrInfo: {},
    mylogin: false,
    safeArea: false,
    filterData: null,
    filterArea: [],
    staticArea: [
      { RegionName: '北京', RegionCode: '11' },
      { RegionName: '北京市', RegionCode: '110100000000' },
    ],
    userType: 'user', // 'user'|'hr'
    selectPostion: [],
    currentLocation: null,
    allCityList: [],
    educationOptions: [],
    experienceOptions: [],
    salaryOptions: [],
    jopStatusOptions: [],
    industryOptions: [],
    companySizeOptions: [],
    welfareOptions: [],
    workTimeOptions: [],
    jopTypeOptions: [],
  },
  api: {
    // host: 'http://daf10181.hk2.ue.net.cn',
    host: 'https://job.729.cn',
    // host: 'http://192.168.1.18:8088',
  },
  getLocation: function name() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        success: (res) => {
          console.log('开启定位成功', res)
          resolve(res)
        },
        fail: () => {
          console.log('用户未授权定位权限')
          this.showModal({
            title: '开启定位',
            content: '你的位置信息将用于小程序位置接口的效果展示',
            success: (res) => {
              console.log(res)
              if (res.confirm) {
                wx.openSetting({
                  success: (res) => {
                    console.log('openSetting', res)
                    if (res.authSetting['scope.userLocation']) {
                      this.getLocation().then((res) => {
                        resolve(res)
                      })
                    } else {
                      console.log('定位失败')
                      reject('定位失败')
                    }
                  },
                })
              } else {
                console.log('定位失败')
                reject('定位失败')
              }
            },
          })
        },
      })
    })
  },
  updataOptions: function (t, a) {
    ;(null != this.globalData.nextOptions &&
      0 != this.globalData.nextOptions.length) ||
      (this.globalData.nextOptions = {}),
      (this.globalData.nextOptions[t] = a)
  },
  showToast: function (str, callback, duration = 1500) {
    wx.showToast({
      icon: 'none',
      title: str,
      duration: duration,
    })
    if (callback) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        callback()
      }, duration)
    }
  },
  showModal: function (options) {
    options.confirmText = options.confirmText ? options.confirmText : '是'
    options.cancelText = options.cancelText ? options.cancelText : '否'
    wx.showModal(options)
  },
  request: function (options, showLoading) {
    let currentPage = getCurrentPages()[getCurrentPages().length - 1]
    if (showLoading) {
      showLoading &&
        wx.showLoading({
          mask: true,
        })
      currentPage.setData({
        loading: true,
        disabled: true,
      })
    }
    return new Promise(function (resolve, reject) {
      options.data.encrypttime = encodeURIComponent(
        encrypt(getTimeStr(Date.now(), 'datetime', true))
      )
      if (!options.data.unauthorization) {
        options.data.customrdsession = wx.getStorageSync('LogiSessionKey')
      }
      // options.header = {
      //   'Content-Type': 'application/x-www-form-urlencoded',
      // }
      options.header = Object.assign(
        {},
        {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        options.header || {}
      )
      options.success =
        options.success ||
        function (res) {
          resolve(res)
        }
      options.fail =
        options.fail ||
        function (err) {
          console.log(err)
          reject(err)
          if (err.errMsg == 'request:fail timeout') {
            wx.showModal({
              content: '请求超时,请检查网络状态',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  wx.navigateBack()
                }
              },
            })
          } else {
            reject(err)
          }
        }
      options.complete =
        options.complete ||
        function () {
          if (showLoading) {
            currentPage.setData &&
              currentPage.setData({
                loading: false,
                disabled: false,
              })
          }
          wx.stopPullDownRefresh()
        }
      var requestTast = wx.request(options)
      options.isAbort &&
        currentPage.setData({
          requestTast: requestTast,
        })
    })
  },
  updateAppHandle: function () {
    var t = wx.getUpdateManager()
    t.onUpdateReady(function (e) {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (e) {
          e.confirm && t.applyUpdate()
        },
      })
    })
  },
})
