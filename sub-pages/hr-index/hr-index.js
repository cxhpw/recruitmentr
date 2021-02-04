// index.js
// 获取应用实例
import { requestList } from '../../api/hr/resume'
const app = getApp()

Component({
  properties: {
    isShow: {
      type: Boolean,
      value: false,
    },
    educationValue: {
      type: Array,
      value: [],
    },
    experienceValue: {
      type: Array,
      value: [],
    },
    salaryValue: {
      type: Array,
      value: [],
    },
    typesValue: {
      type: Array,
      value: [],
    },
  },
  observers: {
    'isShow, educationValue, experienceValue, salaryValue, typesValue': function (
      value
    ) {
      console.log('观察值改变了', value)
      if (value && this.data.attached) {
        this.getList()
      }
    },
  },
  data: {
    // educationValue: [],
    // experienceValue: [],
    // salaryValue: [],
    // typesValue: [],
    attached: false,
    tabs: [
      { title: '推荐', value: 'recommend' },
      { title: '最新', value: 'new' },
    ],
    tabIndex: 0,
    list: [],
    filterText: '',
    loading: true,
    nomore: false,
    buttontext: '加载中',
  },
  options: {
    addGlobalClass: true,
  },
  lifetimes: {
    attached: function () {
      console.log('首页挂载')
      this.setData(
        {
          city: !app.globalData.currentLocation
            ? app.globalData.staticArea
            : [
                { RegionName: app.globalData.currentLocation.province },
                { RegionName: app.globalData.currentLocation.city },
              ],
          attached: true,
        },
        () => {
          this.getList()
        }
      )
    },
    moved: function () {},
    detached: function () {},
  },
  pageLifetimes: {
    show: function () {
      console.log(this)
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
      const {
        tabIndex,
        tabs,
        salaryValue,
        educationValue,
        experienceValue,
        typesValue,
        city,
      } = this.data
      requestList({
        pageindex: pageNum,
        pagesize: 10,
        action: tabs[tabIndex].value,
        name: '',
        area: city[1].RegionName,
        educat: educationValue.join(','),
        salary: salaryValue.join(','),
        experience: experienceValue.join(','),
        status: typesValue.join(','),
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
            pageNum: 0,
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
    onNavToFilter() {
      const {
        educationValue,
        experienceValue,
        salaryValue,
        typesValue,
      } = this.data
      console.log(educationValue, experienceValue, salaryValue, typesValue)
      wx.navigateTo({
        url: '/pages/filter/filter',
        success: function (res) {
          res.eventChannel.emit('filterValue', {
            educationValue,
            experienceValue,
            salaryValue,
            typesValue,
          })
        },
      })
    },
  },
})
