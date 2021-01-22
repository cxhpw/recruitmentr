// index.js
// 获取应用实例
import { requestList } from '../../api/hr/resume'
const app = getApp()

Component({
  data: {
    tabs: [
      { title: '推荐', value: 'recommend' },
      { title: '最新', value: 'new' },
    ],
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
    show: function () {
      console.log('首页show')
    },
    hide: function () {},
    resize: function () {},
  },
  methods: {
    // 事件处理函数
    getList: function (pageNum = 1) {
      const { tabIndex, tabs } = this.data
      requestList({
        pageindex: pageNum,
        pagesize: 20,
        action: tabs[tabIndex].value,
        name: '',
        area: '',
        educat: '',
        salary: '',
        experience: '',
        status: '',
      }).then((res) => {
        console.log('简历列表', res)
      })
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
    onTap(e) {
      const { index } = e.currentTarget.dataset
      this.setData(
        {
          tabIndex: index,
        },
        () => {
          this.getList()
        }
      )
    },
    onAreaTap() {
      wx.navigateTo({
        url: '/pages/area/area',
        events: {
          areaPage: function (data) {
            console.log(data)
          },
        },
        success: function (event) {},
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
