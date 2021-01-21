const app = getApp()
Component({
  data: {
    mylogin: false,
    user: null,
    isRegister: false,
  },
  options: {
    addGlobalClass: true,
  },
  lifetimes: {
    attached: function () {
      console.log('我的挂载')
      app
        .getUserInfos()
        .then((res) => {
          console.log('个人信息', res)
        })
        .catch(() => {
          console.error('未授权')
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
      if (!mylogin) {
        url = '/pages/login/login'
      }
      if (!isRegister) {
        url = '/pages/register/register'
      }
      wx.navigateTo({
        url,
      })
    },
  },
})
