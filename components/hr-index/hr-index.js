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
    list: [],
    filterText: '',
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
      let result = []
      if (app.globalData.filterData) {
        app.globalData.filterData.educations.length &&
          result.push(app.globalData.filterData.educations[0])
        app.globalData.filterData.experiences.length &&
          result.push(app.globalData.filterData.experiences[0])
        app.globalData.filterData.types.length &&
          result.push(app.globalData.filterData.types[0])
        app.globalData.filterData.wages.length &&
          result.push(app.globalData.filterData.wages[0])
      }

      this.setData({
        filterArea: app.globalData.filterArea,
        filterData: app.globalData.filterData,
        filterText: result.join(','),
      })
      this.getList()
    },
    hide: function () {},
    resize: function () {},
  },
  methods: {
    onReachBottom() {
      this.data.pageNum != 0 && this.getList(this.data.pageNum + 1)
    },
    onTab(e) {
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
    // 事件处理函数
    getList: function (pageNum = 1) {
      const { tabIndex, tabs } = this.data
      requestList({
        pageindex: pageNum,
        pagesize: 10,
        action: tabs[tabIndex].value,
        name: '',
        area: app.globalData.filterArea
          ? app.globalData.filterArea[1].RegionName
          : '',
        educat: app.globalData.filterData
          ? app.globalData.filterData.educations.join(',')
          : '',
        salary: app.globalData.filterData
          ? app.globalData.filterData.wages.join(',')
          : '',
        experience: app.globalData.filterData
          ? app.globalData.filterData.experiences.join(',')
          : '',
        status: app.globalData.filterData
          ? app.globalData.filterData.types.join(',')
          : '',
      })
        .then((res) => {
          console.log('简历列表', res)
          if (res.data.ret == 'success') {
            var data = res.data.dataList
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
        })
        .catch((res) => {
          console.error(res)
          this.setData({
            loading: false,
            buttontext: '暂无更多数据',
            nomore: true,
            list: [],
            pageNum: 0
          })
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
