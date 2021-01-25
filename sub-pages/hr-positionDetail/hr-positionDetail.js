const app = getApp()
import { requestDetailById, postReleaseJop } from '../../api/hr/releaseManage'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: -1,
    data: {},
    html: `
      【岗位职责】<br>
                                1、负责跨境电商SaaS服务平台业务需求开发 <br>
2、server端系统架构设计，核⼼代码编写，业务维护；<br>
3、独⽴完成核⼼功能模块，构建清晰代码；<br>
4、参与产品的系统需求分析与设计，深⼊理解⾃⼰所负<br>
责产品的业务逻辑；<br>
5、根据业务需求，与开发经理、产品经理、业务运营等<br>
沟通协作，提供产品技术解决⽅案；<br>
6、技术⽂档编写。<br>
【岗位要求】<br>
1、具有5年以上PHP后台开发经验,要求技术全⾯、具备<br>
程序设计，架构能⼒；有⼤型负载的项⽬；<br>
2、精通PHP语⾔开发，至少熟悉一种PHP框架<br>
3、熟练使⽤Mysql5，对于Memcached, Redis等常⻅的<br>
NoSQL数据存储⽐较熟悉；<br>
4、熟练使⽤Linux系统；<br>
5、有过⼤并发项⽬处理经验；<br>
6、必须拥有良好的代码习惯，要求结构清晰、命名规范、<br>
可读性强、代码冗余率低；<br>
7、⼯作责任⼼强，具备良好的团队合作精神，有较强的<br>
沟通、协作能⼒，能够承受⼀定的⼯作压⼒。
                            
    `,
  },
  onMapTap() {
    wx.openLocation({
      latitude: 22.613217,
      longitude: 114.040505,
      name: '蓝困大厦',
      scale: 18,
    })
  },
  getDetail(id) {
    requestDetailById(id).then((res) => {
      console.log('详情', res)
      this.setData({
        data: res.data,
      })
    })
  },
  onClose() {
    postReleaseJop({
      action: 'close',
      id: this.data.id,
    }).then((res) => {
      app.showToast(res.data.msg, () => {
        this.getDetail(this.data.id)
      })
    })
  },
  onOpen() {
    postReleaseJop({
      action: 'open',
      id: this.data.id,
    }).then((res) => {
      app.showToast(res.data.msg, () => {
        this.getDetail(this.data.id)
      })
    })
  },
  onEdit() {
    wx.navigateTo({
      url: `/sub-pages/hr-releaseBaseInfo/hr-releaseBaseInfo?id=${this.data.id}`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
    })
    this.getDetail(options.id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.globalData.isRef &&
      this.getDetail(this.data.id) &&
      (app.globalData.isRef = false)
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
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
