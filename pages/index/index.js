import { togglerRole, getRoleInfos } from '../../api/user'
import { requestJopsList } from '../../api/jobs'
import { requestList } from '../../api/JobFair'
import { requestLetter } from '../../api/hr/message'
import { requestUserInfo } from '../../api/user/user'
import requestAd from '../../api/ad'

// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    letterList: [],
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
    background: 'transparent',
    banner: [],
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
  // getJopFairList() {
  //   requestList({
  //     pageindex: 1,
  //     pageNum: 9999,
  //     userid: Object.keys(app.globalData.userInfo).length
  //       ? app.globalData.userInfo.AutoID
  //       : 0,
  //   }).then((res) => {
  //     console.log('招聘会banner', res)
  //     this.setData({
  //       jopFairList: res.data.dataList,
  //     })
  //   })
  // },
  onJopFairTap(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/activity/detail/detail?id=${id}`,
    })
    // wx.navigateTo({
    //   url: `/pages/activity/activity`,
    // })
  },
  getSingleLists: function (pageNum = 1) {
    this.setData({
      loadData: false,
      nomore: false,
      loading: true,
      showLoadButton: true,
    })
    requestLetter({
      pageindex: pageNum,
      pagesize: 10,
    })
      .then((res) => {
        console.log('站内行', res.data.dataList)
        this.setData({
          letterList: res.data.dataList,
        })
      })
      .catch(() => {
        this.setData({
          nomore: true,
        })
      })
      .finally(() => {
        this.setData({
          loadData: true,
          showLoadButton: false,
        })
      })
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
  onNavToN(e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/article/article?id=${id}`,
    })
  },
  onNavTo(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({
      url,
    })
  },
  getUser() {
    return new Promise((resolve, reject) => {
      requestUserInfo()
        .then((res) => {
          console.log('求职者信息', res)
          app.globalData.mylogin = true
          app.globalData.userInfo = res.data
          this.setData({
            user: res.data,
            mylogin: true,
          })
        })
        .catch((err) => {
          // console.error('求职者信息', err)
          reject(err)
          // if (err.reponsive.msg == '请注册求职者信息！') {
          //   wx.reLaunch({
          //     url: '/pages/register/register',
          //   })
          //   return
          // }
          // wx.reLaunch({
          //   url: '/pages/register/register'
          // })
        })
    })
  },
  onLoad() {
    togglerRole(99).then((res) => {
      app.globalData.userType = 'user'
      app.globalData.roleInfo.Role = res.data.Role
      this.getUser()
        .then((res) => {
          console.log('求职者信息', res)
          app.globalData.mylogin = true
          app.globalData.userInfo = res.data
          this.setData({
            user: res.data,
            mylogin: true,
          })
        })
        .catch((err) => {
          app.globalData.mylogin = false
          wx.removeStorageSync('LogiSessionKey')
        })
    })
    this.getList()
    app.mylogin = () => {
      this.setData(
        {
          user: app.globalData.userInfo,
          jobExpectList: app.globalData.userInfo.JobExpectList || [],
        }
      )
    }
    requestAd().then((res) => {
      console.log('banner', res)
      this.setData({
        banner: res.data.dataList,
      })
    })
  },
  onShow() {
    this.getSingleLists()
    this.setData({
      mylogin: app.globalData.mylogin
    })
    setTimeout(() => {
      this.setData(
        {
          user: app.globalData.userInfo,
          jobExpectList: app.globalData.userInfo.JobExpectList || [],
        },
        () => {
          // if (!this.data.jobExpectList.length) {
          //   this.setData({
          //     list: [],
          //     nomore: true,
          //   })
          // }
          this.getList()
        }
      )
    }, 500)
  },
  onAdTap(e) {
    const { url } = this.data
    wx.navigateTo({
      url,
    })
  },
  onReachBottom() {
    this.data.pageNum != 0 && this.getList(this.data.pageNum + 1)
  },
  onPageScroll({ scrollTop }) {
    if (scrollTop > 64) {
      this.setData({
        color: '#000',
        background: '#fff',
      })
    } else {
      this.setData({
        color: '#fff',
        background: 'transparent',
      })
    }
  },
  onShareAppMessage() {
    return {
      title: '柯城云就业',
      path: '/pages/index/index', 
      imageUrl: 'https://s3.ax1x.com/2021/01/21/sh67FI.jpg',
    }
  },
})
