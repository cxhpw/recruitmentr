const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    safeArea: app.globalData.safeArea ? 'safeArea' : '',
    active: 0,
    html: `
      
                                对当前严峻的就业形势，校园招聘会可以让他学生们直面
企业，了解就业的一个方向，接下来小编为你带来招聘会
策划，供你参考借鉴。<br>
<br>
一、 项目背景<br>
对当前严峻的就业形势，我校不少大学生对未来就业前景
感到忧心。我们有对于一些即将毕业的学生进行过调查，
绝大多数的同学都对自己即将到来的就业问题感到悲观，
而让他们悲观的一个重要原因是对于外面的招聘信息了解
不多或者不能更好的选择招聘路径。
<br>
二、项目调查
                            
    `,
  },
  onShare() {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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
  onShareAppMessage: function () {
    return {
      title: '2021年春季招聘会',
    }
  },
})
