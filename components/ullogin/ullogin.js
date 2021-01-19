// components/ullogin/ullogin.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    text: {
      type: String,
      value: '阿哦，您还没有登录哦！'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    loginTap: function(){
      wx.navigateTo({
        url: "/pages/selectLogin/selectLogin"
      })
    }
  }
})
