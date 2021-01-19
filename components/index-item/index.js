Component({
  externalClasses: ['i-class'],
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    name: {
      type: String,
      value: ''
    }
  },
  relations: {
    '../index/index': {
      type: 'parent'
    }
  },
  data: {
    top: 0,
    height: 0,
    currentName: ''
  },
  methods: {
    updateDataChange() {
      const className = '.i-index-item';
      const query = wx.createSelectorQuery().in(this);
      query.select(className).boundingClientRect((res) => {
        this.setData({
          top: res.top,
          height: res.height,
          currentName: this.data.name
        })
      }).exec()
    }
  }
})