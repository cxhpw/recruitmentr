// components/modal/modal.js
Component({
  externalClasses: ["custom-class"],
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false
    },
    buttonText: {
      type: String,
      value: "兑换"
    },
    placeholder: {
      type: String,
      value: ""
    },
    custom: {
      type: Boolean,
      value: false
    },
    value: {
      type: String,
      value: ""
    },
    interval: {
      type: Number,
    },
    center: {
      type: Boolean,
      value: false
    },
    rgba: {
      type: String,
      value: 'rgba(2, 13, 17, .5)'
    }
  },
  options: {
    multipleSlots: true
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
    onipuut: function (e) {
      this.setData({
        value: e.detail.value
      })
    },
    duihuan: function () {
      this.triggerEvent('Click', {
        value: this.data.value
      })
    },
    close: function () {
      this.triggerEvent('close', {})
    }
  }
})