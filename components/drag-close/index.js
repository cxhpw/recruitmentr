var app = getApp();
Component({
  externalClasses: ['custom-class'],
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {
    isShow: {
      type: Boolean,
      value: !1,
      observer: function (t) {
        var _self = this;
        console.log(t);
        clearTimeout(this.timer), t ?
          this.setData({
            isDisplay: true
          }) : this.timer = setTimeout(function () {
            _self.setData({
              isDisplay: false
            });
          }, 300);
      }
    },
    footer: {
      type: String,
      value: ""
    },
    buttonText: {
      type: String,
      value: "确定"
    },
    title: {
      type: String,
      value: ""
    },
    zindex: {
      type: String,
      value: "1000"
    },
    showFooter: {
      type: Boolean,
      value: false
    },
    isDragClose: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isDisplay: false,
    touchendState: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    ready: function () {},
    touchend: function () {
      this.setData({
        touchendState: this.data.touchendState + 1
      });
    },
    close: function (t) {
      var e = "touch" === t ? t : "default";
      this.setData({
        isShow: false
      }), 
      this.triggerEvent("closed", e);
    },
    confirm: function () {
      console.log(12312);
      this.triggerEvent("confirm");
    },
    handleTouchmove: function () {},
  }
})