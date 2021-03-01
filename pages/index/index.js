import { togglerRole } from '../../api/user'
import { requestJopsList } from '../../api/jobs'
import { requestList } from '../../api/JobFair'
// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    tabs: [{ title: '推荐' }, { title: '最新' }],
    tabIndex: 0,
    list: [],
    loading: true,
    buttontext: '加载中',
    nomore: false,
    pageNum: 1,
    user: null,
    activeIndex: 0,
    jobExpectList: [],
    jopFairList: [],
    color: '#fff',
    background: "transparent"
  },
  onTap(e) {
    const { index } = e.currentTarget.dataset
    this.setData(
      {
        activeIndex: index,
      },
      () => {
        this.getList()
      }
    )
  },
  getJopFairList() {
    requestList({
      pageindex: 1,
      pageNum: 9999,
      userid: Object.keys(app.globalData.userInfo).length
        ? app.globalData.userInfo.AutoID
        : 0,
    }).then((res) => {
      console.log('招聘会banner', res)
      this.setData({
        jopFairList: res.data.dataList,
      })
    })
  },
  onJopFairTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/activity/detail/detail?id=${id}`,
    })
    // wx.navigateTo({
    //   url: `/pages/activity/activity`,
    // })
  },
  // 事件处理函数
  getList: function (pageNum = 1) {
    this.setData({
      loading: true,
      buttontext: '加载中',
    })
    console.log(this.data.jobExpectList)
    requestJopsList({
      pageindex: pageNum,
      pageindex: 10,
      jid: this.data.jobExpectList.length
        ? this.data.jobExpectList[this.data.activeIndex].AutoID
        : '',
    })
      .then((res) => {
        console.log('职位列表', res)
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
              list: [],
            })
          }
        }
      })
      .catch(() => {
        this.setData({
          nomore: true,
          list: [],
        })
      })
      .finally(() => {
        wx.hideLoading()
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
  onLoad() {
    togglerRole(99).then((res) => {
      app.globalData.userType = 'user'
      app.globalData.roleInfo.Role = res.data.Role
    })
    app.mylogin = () => {
      this.setData(
        {
          user: app.globalData.userInfo,
          jobExpectList: app.globalData.userInfo.JobExpectList || [],
        },
        () => {
          this.getList()
        }
      )
    }
  },
  onShow() {
    if (!this.data.jopFairList.length) {
      this.getJopFairList()
    }
    this.getJopFairList()
    setTimeout(() => {
      this.setData(
        {
          user: app.globalData.userInfo,
          jobExpectList: app.globalData.userInfo.JobExpectList || [],
        },
        () => {
          if (!this.data.jobExpectList.length) {
            this.setData({
              list: [],
              nomore: true,
            })
            return
          }
          this.getList()
        }
      )
    }, 500)
  },
  onReachBottom() {
    this.data.pageNum != 0 && this.getList(this.data.pageNum + 1)
  },
  onPageScroll({ scrollTop }) {
    console.log(scrollTop)
    if (scrollTop > 64) {
      this.setData({
        color: '#000',
        background: '#fff',
      })
    } else {
      this.setData({
        color: '#fff',
        background: "transparent"
      })
    }
  },
})
