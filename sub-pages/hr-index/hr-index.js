// index.js
// 获取应用实例
const app = getApp()

Component({
  data: {
    tabs: [{ title: '推荐' }, { title: '最新' }],
    tabIndex: 0,
    list: [{}, {}, {}, {}],
  },
  options: {
    addGlobalClass: true,
  },

  lifetimes: {
    attached: function () {
      console.log('首页')
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
    // 事件处理函数
    getList: function (pageNum = 1) {
      var temp = {}
      temp.apiname = 'getchilduserlist'
      temp.pageNum = pageNum
      temp.pageSize = 10
      this.setData({
        loading: true,
      })
      app.request({
        url: app.api.host + 'Include/Weixin/wechatdata',
        data: temp,
        success: (res) => {
          console.log('=======', res)
          if (res.data.ret == 'success') {
            var data = res.data.datalist
            this.setData({
              init: true,
            })
            if (res.data.TotalCount - 10 * (pageNum - 1) <= 10) {
              this.setData({
                nomore: true,
                buttontext: '暂无更多数据',
                loading: false,
                pageNum: 0,
              })
            } else {
              this.setData({
                buttontext: '加载中..',
                loading: true,
                pageNum: pageNum,
              })
            }
            if (res.data.TotalCount > 0) {
              this.setData({
                list: pageNum == 1 ? data : this.data.list.concat(data),
                nomore: false,
              })
            } else {
              this.setData({
                nomore: true,
                loadData: false,
              })
            }
          }
        },
      })
    },
    onAreaTap() {
      wx.navigateTo({
        url: '/pages/area/area',
      })
    },
    onNavTo(e) {
      const { url } = e.currentTarget.dataset
      wx.navigateTo({
        url,
      })
    },
  },
})
