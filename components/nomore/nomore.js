// components/nomore/nomore.js
Component({
  externalClasses: ['custom-class'],
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
    styleIsolation: 'apply-shared',
  },
  /**
   * 组件的属性列表
   */
  properties: {
    useSlotTitle: {
      type: Boolean,
      value: false,
    },
    title: {
      type: String,
      value: '暂无数据',
    },
    src: {
      type: String,
      value: './2eb7ddd41d49a3a4ea0120508ca62621_03.png',
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
