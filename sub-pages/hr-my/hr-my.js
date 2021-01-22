import { requestHRInfo  } from '../../api/hr/company'
const app = getApp()
Component({
  data: {
    mylogin: app.globalData.mylogin,
    user: null,
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
          user: res.data
        })
      })
    },
    moved: function () {},
    detached: function () {},
  },
  pageLifetimes: {
    show: function () {},
    hide: function () {},
    resize: function () {},
  },
  methods: {
    onNavTo(e) {
      let { url } = e.currentTarget.dataset
      const { mylogin, isRegister } = this.data
      wx.navigateTo({
        url,
      })
    },
  },
})
