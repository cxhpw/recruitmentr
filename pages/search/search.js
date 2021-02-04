const app = getApp()
import { Debounce } from '../../utils/util'
import { requestCompanyList } from '../../api/company'
import { requestJopsList, requestRecommendSearch } from '../../api/jobs'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nearby: '',
    initParams: null,
    mylogin: false,
    recommentSearch: [],
    totalFilterCount: 0,
    city: null,
    educationValue: [],
    experienceValue: [],
    salaryValue: [],
    sizeValue: [],
    industryValue: [],
    type: '', //fieldwork实习， pluralism 兼职，nearby 附近，留空全职
    searchKey: '',
    searchType: ['搜职位', '搜公司'],
    typeIndex: 0,
    list: [],
    buttontext: '加载中..',
    loading: true,
    pageNum: 1,
    loadData: false,
    nomore: false,
    showLoadButton: false,
  },
  onTypeTap(e) {
    const { index } = e.currentTarget.dataset
    this.setData(
      {
        typeIndex: index,
      },
      () => {
        this.getSingleLists()
      }
    )
  },
  onSearch: Debounce(function (e) {
    console.log(e)
    this.setData(
      {
        searchKey: e.detail.value,
      },
      () => {
        this.getSingleLists(1)
      }
    )
  }, 250),
  getSingleLists: function (pageNum = 1) {
    const {
      typeIndex,
      type,
      industryValue,
      educationValue,
      experienceValue,
      sizeValue,
      salaryValue,
      city,
    } = this.data
    if (
      this.data.searchKey == '' &&
      ['fieldwork', 'pluralism', 'nearby'].indexOf(this.data.type) == -1
    ) {
      this.setData({
        list: [],
        nomore: false,
        showLoadButton: false,
      })
      return
    }
    let requestList = () => {}
    let temp = {
      pageindex: pageNum,
      pagesize: !this.data.mylogin ? 5 : 10,
      name: this.data.searchKey,
      area: this.data.type == 'nearby' ? this.data.nearby : city[1].RegionName,
    }
    if (typeIndex == 0) {
      // 职位搜索
      requestList = requestJopsList
      temp = Object.assign(temp, {
        educat: educationValue.join(','),
        salary: salaryValue.join(','),
        experience: experienceValue.join(','),
        staffsize: sizeValue.join(','),
        industry: industryValue.join(','),
        typeid: type == 'fieldwork' ? 27 : type == 'pluralism' ? 28 : '',
      })
    } else {
      // 公司搜索
      requestList = requestCompanyList
      temp = Object.assign(temp, {
        typeid: type == 'fieldwork' ? 27 : type == 'pluralism' ? 28 : '',
        staffsize: sizeValue.join(','),
        industry: industryValue.join(','),
      })
    }
    this.setData({
      loading: true,
      showLoadButton: true,
      loadData: false,
      nomore: false,
      buttontext: '加载中..',
    })
    requestList(temp)
      .then((res) => {
        console.log('搜索结果', res)
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
              list: [],
              nomore: true,
            })
          }
        } else {
          this.setData({
            list: [],
            nomore: true,
          })
        }
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
  onNavTo(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({
      url,
    })
  },
  onFilterTap() {
    const {
      sizeValue,
      educationValue,
      experienceValue,
      industryValue,
      salaryValue,
    } = this.data
    if (this.data.typeIndex) {
      // 公司筛选
      wx.navigateTo({
        url: `/pages/filter/filter?type=company`,
        success: function (res) {
          res.eventChannel.emit('filterValue', {
            sizeValue,
            educationValue,
            experienceValue,
            industryValue,
            salaryValue,
          })
        },
      })
    } else {
      // 职位筛选
      wx.navigateTo({
        url: `/pages/filter/filter?type=jop`,
        success: function (res) {
          res.eventChannel.emit('filterValue', {
            sizeValue,
            educationValue,
            experienceValue,
            industryValue,
            salaryValue,
          })
        },
      })
    }
  },
  onAreaTap() {
    wx.navigateTo({
      url: `/pages/area/area`,
    })
  },
  onSelect(e) {
    const { key } = e.currentTarget.dataset
    this.setData(
      {
        searchKey: key,
      },
      () => {
        this.getSingleLists()
      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (!app.globalData.recommentSearch) {
      requestRecommendSearch().then((res) => {
        console.log('推荐搜索', res)
        app.globalData.recommentSearch = res.data.dataList
        this.setData({
          recommentSearch: res.data.dataList,
        })
      })
    } else {
      this.setData({
        recommentSearch: app.globalData.recommentSearch,
      })
    }
    this.setData({
      initParams: options,
      mylogin: app.globalData.mylogin,
      searchKey: options.searchKey || '',
      type: options.type || '',
      isLocation: !app.globalData.currentLocation ? false : true,
      nearby: !app.globalData.currentLocation
        ? ''
        : app.globalData.currentLocation.district,
      city: !app.globalData.currentLocation
        ? app.globalData.staticArea
        : [
            { RegionName: app.globalData.currentLocation.province },
            { RegionName: app.globalData.currentLocation.city },
          ],
    })
  },
  onOpenLocation() {
    app.getLocation().then(() => {
      app.mapInstance.reverseGeocoder({
        success: (res) => {
          app.globalData.currentLocation = res.result.ad_info
          this.setData(
            {
              isLocation: true,
              nearby: res.result.ad_info.district,
            },
            () => {
              this.getSingleLists()
            }
          )
        },
        fail: (err) => {
          console.error(err)
        },
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const {
      educationValue,
      experienceValue,
      salaryValue,
      sizeValue,
      industryValue,
    } = this.data
    this.setData({
      totalFilterCount:
        educationValue.length +
        experienceValue.length +
        salaryValue.length +
        sizeValue.length +
        industryValue.length,
    })
    this.getSingleLists()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.data.mylogin &&
      this.data.pageNum != 0 &&
      this.getSingleLists(this.data.pageNum + 1)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
