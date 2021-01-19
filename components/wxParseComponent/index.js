// components/wxParseComponent/index.js
var WxParse = require('../../wxParse/wxParse')
Component({
  options: {
    styleIsolation: 'apply-shared',
  },
  /**
   * 组件的属性列表
   */
  properties: {
    html: {
      type: String,
      value: '',
    },
  },
  observers: {
    html: function (newValue) {
      WxParse.wxParse('article', 'html', newValue, this, 20)
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    wxParseLoaded: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {},
})
