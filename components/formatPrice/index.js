// components/formatPrice/index.js
Component({
  externalClasses: ['custom-class', 'ins-class'],
  options: {
    styleIsolation: 'apply-shared',
  },
  /**
   * 组件的属性列表
   */
  properties: {
    price: {
      type: String,
      value: '0',
    },
    ins: {
      type: String,
      value: '￥',
    },
    unit: {
      type: String,
      value: '/日起',
    },
  },
  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {},
})
