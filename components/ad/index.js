// components/ad/index.js
import basic from '../mixins/basic'
Component({
  externalClasses: ['custom-class'],
  behaviors: [basic],
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    onClose(e) {
      console.log(e)
      this.$emit('close', { date: e })
    },
  },
})
