const app = getApp()
import { requestResumeFilter } from '../../api/config'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    user: null,
    avatar: '',
    status: [],
    statusValue: -1,
    advantage: '',
  },
  onStatusChange(e) {
    this.setData({
      statusValue: e.detail.value,
    })
  },
  onNavTo(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({
      url,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    requestResumeFilter().then((res) => {
      console.log(res)
      this.setData({
        status: res.data[3].keyvalue,
        statusValue: -1,
      })
    })
    this.setData({
      user: {
        ret: 'success',
        msg: '获取成功！',
        AutoID: 1,
        Name: '奶瓶',
        HeaderPhoto:
          'http://192.168.1.18:8088/Upload/2021/01/202101266088964.png',
        Gender: '女',
        Birthday: '2016-01',
        Email: '',
        Experience: '学生',
        Age: '5岁',
        Educat: '',
        Advantage:
          '<p>实打实大苏打实打实</p><p>撒倒萨倒萨倒萨倒萨倒萨倒萨</p><p>萨达萨达萨达萨达萨达</p>',
        JobStatus: '',
        JobExpectList: [
          {
            City: '唐山市',
            Job: '会计',
            Industry: '游戏',
            Salary: '3-5K',
          },
        ],
        WorkExList: [],
        EducatExList: [
          {
            School: '社会大学',
            Educat: '高中',
            Specialty: '考古',
            TimePart: '2020-2026',
            SchoolEx: '撒大撒大撒大撒',
          },
        ],
      },
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
