import { requestHRInfo } from '../../api/hr/company'
import { togglerRole, auth, getRoleInfos } from '../../api/user'
import { requestList } from '../../api/JobFair'
const app = getApp()
Component({
  properties: {
    isShow: {
      type: Boolean,
      value: false,
    },
  },
  observers: {
    isShow: function (value) {
      console.log('isShow', value)
      if (value) {
        wx.login({
          success: (e) => {
            this.setData({
              code: e.code,
            })
          },
        })
        requestHRInfo().then((res) => {
          app.globalData.hrInfo = res.data
          this.setData({
            mylogin: true,
            user: res.data,
          })
        })
      }
    },
  },
  data: {
    jopFairList: [],
    code: 0,
    mylogin: app.globalData.mylogin,
    user: null,
    ad: [
      {
        image: 'https://s3.ax1x.com/2021/01/19/s2S9Et.jpg',
        url: `/pages/activity/activity?id=${0}`,
      },
    ],
  },
  options: {
    addGlobalClass: true,
  },
  lifetimes: {
    attached: function () {
      console.log('我的,挂载')
      requestList({
        pageindex: 1,
        pagesize: 99999,
      }).then((res) => {
        this.setData({
          jopFairList: res.data.dataList,
        })
      })
      // wx.login({
      //   success: (e) => {
      //     this.setData({
      //       code: e.code,
      //     })
      //   },
      // })
      // requestHRInfo().then((res) => {
      //   app.globalData.hrInfo = res.data
      //   this.setData({
      //     mylogin: true,
      //     user: res.data,
      //   })
      // })
    },
    moved: function () {},
    detached: function () {},
  },
  pageLifetimes: {
    show: function () {
      requestHRInfo().then((res) => {
        app.globalData.hrInfo = res.data
        this.setData({
          mylogin: true,
          user: res.data,
        })
      })
    },
    hide: function () {},
    resize: function () {},
  },
  methods: {
    onPhone(e) {
      console.log('weapp绑定手机', e)
      const { detail } = e
      const { user, code } = this.data
      if (detail.errMsg.indexOf('fail') > -1) {
        console.log('授权手机失败', detail)
        app.showToast('未授权')
      } else {
        auth({
          encryptedData: encodeURIComponent(detail.encryptedData),
          iv: encodeURIComponent(detail.iv),
          code,
        })
          .then((res) => {
            console.log(res)
            if (res.data.ret == 'success') {
              wx.setStorageSync('LogiSessionKey', res.data.rdsession)
              app.globalData.mylogin = true
              this.setData({
                mylogin: true,
              })
              getRoleInfos().then((res) => {
                console.log('授权信息', res)
                app.globalData.roleInfo = res.data
              })
              togglerRole(1).then((res) => {
                app.globalData.userType = 'Hr'
                app.globalData.roleInfo.Role = res.data.Role
                requestHRInfo()
                  .then((res) => {
                    console.log('hr 信息', res)
                    this.setData({
                      user: res.data,
                    })
                    app.globalData.hrInfo = res.data
                  })
                  .catch((err) => {
                    // 未填写企业信息
                    console.error('--', err)
                    if (err.reponsive.msg == '请授权登录！') {
                    } else {
                      wx.reLaunch({
                        url: '/sub-pages/hr-register/hr-register',
                      })
                    }
                  })
              })
            }
          })
          .catch((err) => {
            console.error(err)
          })
      }
    },
    onAdClick(e) {
      const { id } = e.currentTarget.dataset
      wx.navigateTo({
        url: `/pages/activity/detail/detail?id=${id}`,
      })
    },
    onToggler() {
      togglerRole(99).then((res) => {
        app.globalData.userType = 'user'
        app.globalData.roleInfo.Role = res.data.Role
        wx.reLaunch({
          url: '/pages/index/index',
        })
      })
    },
    onCompanyTap() {
      if (this.data.user.Status == 1) {
        wx.navigateTo({
          url: '/sub-pages/hr-companyCertification/hr-companyCertification',
        })
      } else {
        wx.navigateTo({
          url: '/sub-pages/hr-company/hr-company',
        })
      }
    },
    onNavTo(e) {
      let { url } = e.currentTarget.dataset
      const { mylogin, isRegister, user } = this.data
      wx.navigateTo({
        url,
      })
    },
    onNavToM(e) {
      let { url } = e.currentTarget.dataset
      const { mylogin, isRegister, user } = this.data
      if (user.Status == 1) {
        wx.navigateTo({
          url: '/sub-pages/hr-companyCertification/hr-companyCertification',
        })
        return
      }
      wx.navigateTo({
        url,
      })
    },
  },
})
