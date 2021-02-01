// components/ullogin/ullogin.js
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
    src: {
      type: String,
    },
    fit: {
      type: String,
      value: 'aspectFill',
    },
    useErrorSlot: {
      type: Boolean,
      value: false
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
    imageOnLoad(e) {
      if (e.type == 'load') {
        this.setData({
          loaded: true,
        })
      }
    },
    onError(e) {
      this.setData({
        error: true,
      })
    },
  },
})
