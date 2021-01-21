// components/tabBar/index.js
var app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    color: "#aab0b5",
    selectedColor: "#000000",
    borderStyle: "white",
    backgroundColor: "#fff",
    hidden: false,
    list: [{
        "pagePath": "/pages/index/index",
        "text": "",
        "iconPath": "/assets/images/index.png",
        "selectedIconPath": "/assets/images/index-select.png"
      },
      {
        "pagePath": "/pages/order/order",
        "text": "",
        "iconPath": "/assets/images/order.png",
        "selectedIconPath": "/assets/images/order-select.png"
      },
      {
        "pagePath": "/pages/order/order",
        "text": "",
        "iconPath": "/assets/images/order.png",
        "selectedIconPath": "/assets/images/order-select.png"
      },
      {
        "pagePath": "/pages/my/my",
        "text": "",
        "iconPath": "/assets/images/my.png",
        "selectedIconPath": "/assets/images/my-select.png"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab(e) {
      var _self = this;
      var data = e.currentTarget.dataset;
      var url = data.path;
      wx.switchTab({
        url: url,
      });
    },
    booktap: function () {
      wx.navigateTo({
        url: '/pages/booking/booking',
      });
    },
    cameraTap: function () {
      app.showModal({
        content: "是否打开扫一扫",
        success: function (res) {
          if (res.confirm) {
            wx.scanCode({
              success(res) {
                console.log(res)
              }
            })
          }
        }
      })
    }
  }
})