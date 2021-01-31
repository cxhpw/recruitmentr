import { togglerRole } from '../../api/user'
import { requestJopsList } from '../../api/jobs'
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
  // 事件处理函数
  getList: function (pageNum = 1) {
    this.setData({
      loading: true,
    })
    console.log(this.data.jobExpectList)
    requestJopsList({
      pageindex: pageNum,
      pageindex: 10,
      jid: this.data.jobExpectList.length ? this.data.jobExpectList[this.data.activeIndex].JobID : '',
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
            })
          }
        }
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
    togglerRole(99)
  },
  onShow() {
    this.setData(
      {
        user: app.globalData.userInfo,
        jobExpectList: app.globalData.userInfo.JobExpectList || [],
      }
    )
    app.mylogin = () => {
      this.setData(
        {
          user: app.globalData.userInfo,
          jobExpectList: app.globalData.userInfo.JobExpectList,
        },
        () => {
          this.getList()
        }
      )
    }
  },
  onReachBottom() {
    this.data.pageNum != 0 && this.getList(this.data.pageNum + 1)
  },
})
