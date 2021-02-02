const app = getApp()
import { requestCompanyDetailById } from '../../api/company'
import { requestJopsList } from '../../api/jobs'
import { requestAllPositionName } from '../../api/config'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    html: '',
    form: null,
    isMore: false,
    recommendOptions: [],
    recommendValue: -1,
    salaryOptions: [], //薪水
    salaryValue: -1,
    experienceOptions: [], // 经验
    experienceValue: -1,
    cityOptions: [],
    cityValue: -1,
    show: false
  },
  onSalaryChange(e) {
    console.log(e)
    this.setData(
      {
        salaryValue: e.detail,
      },
      () => {
        this.getList()
      }
    )
  },
  onExperienceChange(e) {
    this.setData(
      {
        experienceValue: e.detail,
      },
      () => {
        this.getList()
      }
    )
  },
  onRecommendChange(e) {
    this.setData(
      {
        recommendValue: e.detail,
      },
      () => {
        this.getList()
      }
    )
  },
  onNavTo(e) {
    const { url } =e.currentTarget.dataset
    wx.navigateTo({
      url
    })
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
      cid: this.data.id,
      salary:
        [-1, 0].indexOf(this.data.salaryValue) >= 0
          ? '不限'
          : this.data.salaryOptions[this.data.salaryValue].text,
      experience:
        [-1, 0].indexOf(this.data.experienceValue) >= 0
          ? '不限'
          : this.data.experienceOptions[this.data.experienceValue].text,
      name:
        [-1, 0].indexOf(this.data.recommendValue) >= 0
          ? ''
          : this.data.recommendOptions[this.data.recommendValue].text,
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
  onChange(e) {
    this.setData({
      active: e.detail.index,
    })
  },
  oMore() {
    this.setData({
      html: this.data.data.Intro,
      isMore: false,
    })
  },
  onMap() {
    const { Latitude, Longitude, WorkPlace, Address } = this.data.form
    wx.openLocation({
      latitude: Number(Latitude),
      longitude: Number(Longitude),
      name: WorkPlace,
      address: Address,
      scale: 18,
    })
  },
  onOpen() {
    this.setData({
      show: true
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  onPreview(e) {
    const { url } = e.currentTarget.dataset
    wx.previewImage({
      urls: this.data.data.AlbumList.map((item) => {
        return item.Img
      }),
      current: url,
    })
  },
  getDetail(id) {
    requestCompanyDetailById(id).then((res) => {
      console.log('公司详情', res)
      let html = res.data.Intro
      let isMore = this.data.isMore
      if (res.data.Intro.length > 150) {
        html = html.substr(0, 150) + '...'
        isMore = true
      }
      let recommendOptions = [
          {
            text: '全部',
            value: 0,
          },
        ],
        salaryOptions = [
          {
            text: '全部',
            value: 0,
          },
        ],
        experienceOptions = [
          {
            text: '全部',
            value: 0,
          },
        ]
      res.data.JobFilter.forEach((item, index) => {
        switch (item.KeyName) {
          case '推荐职位':
            recommendOptions = recommendOptions.concat(
              item.KeyValue.map((cell, index) => {
                return {
                  text: cell.Item,
                  value: index + 1,
                }
              })
            )
            break
          case '经验':
            experienceOptions = experienceOptions.concat(
              item.KeyValue.map((cell, index) => {
                return {
                  text: cell.Item,
                  value: index + 1,
                }
              })
            )
            break
          case '薪资':
            salaryOptions = salaryOptions.concat(
              item.KeyValue.map((cell, index) => {
                return {
                  text: cell.Item,
                  value: index + 1,
                }
              })
            )
            break
        }
      })
      this.setData({
        data: res.data,
        html,
        isMore,
        experienceOptions,
        salaryOptions,
        recommendOptions,
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDetail(options.id)
    this.setData(
      {
        id: options.id,
      },
      () => {
        this.getList()
      }
    )
    // requestAllPositionName().then((res) => {
    //   console.log('职位类型', res)
    //   this.setData({
    //     recommendOptions: res.data.dataList.map((item, index) => {
    //       return {
    //         id: item.AutoID,
    //         text: item.Name,
    //         value: index,
    //       }
    //     }),
    //   })
    // })
    this.setData({
      form: JSON.parse(options.formData),
      // salaryOptions: app.globalData.salaryOptions.map((item, index) => {
      //   return {
      //     text: item == '不限' ? '全部' : item,
      //     value: index,
      //   }
      // }),
      // experienceOptions: app.globalData.experienceOptions.map((item, index) => {
      //   return {
      //     text: item == '不限' ? '全部' : item,
      //     value: index,
      //   }
      // }),
      // industryOptions: app.globalData.industryOptions.map((item, index) => {
      //   return {
      //     text: item == '不限' ? '全部' : item,
      //     value: index,
      //   }
      // }),
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
