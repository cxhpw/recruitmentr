import { requestHRInfo } from '../../api/hr/company'
import { togglerRole } from '../../api/user'
const app = getApp()
Component({
  data: {
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
      requestHRInfo().then((res) => {
        app.globalData.hrInfo = res.data
        this.setData({
          mylogin: true,
          user: res.data,
        })
      })
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
    onAdClick(e) {
      const { url } = e.currentTarget.dataset
      wx.navigateTo({
        url
      })
    },
    onToggler() {
      togglerRole(99).then(() => {
        wx.switchTab({
          url: '/pages/my/my',
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
      const { mylogin, isRegister } = this.data
      wx.navigateTo({
        url,
      })
    },
  },
})
