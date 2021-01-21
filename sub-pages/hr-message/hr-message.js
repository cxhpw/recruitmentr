const app = getApp()
Component({
  data: {
    active: 0,
  },
  options: {
    addGlobalClass: true,
  },
  lifetimes: {
    attached: function () {
      console.log('消息')
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
    onChatRoomTap() {
      wx.navigateTo({
        url: '/pages/chatroom/chatroom',
      })
    },
    onChange(e) {
      console.log(e)
    },
    onTabsClick(e) {
      console.log(e)
      wx.navigateTo({
        url: '/pages/register/register',
      })
      wx.pageScrollTo({
        scrollTop: 0,
      })
    },
  },
})
