Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    animations: Object,
    imgUrls: {
      type: Array,
      value: [],
      observer: function observer(newVal, oldVal, changedPath) {
        this.setData({ currentImgs: newVal })
      }
    },
    showDelete: {
      type: Boolean,
      value: true
    },
    show: {
      type: Boolean,
      value: false
    },
    current: {
      type: Number,
      value: 0
    },
    hideOnClick: {
      type: Boolean,
      value: true
    },
    extClass: {
      type: Boolean,
      value: ''
    }
  },
  observers: {},
  data: {
    currentImgs: [],
    lockSelector: ['私密', '公开'],
    lockIndex: 0
  },
  ready: function ready() {
    var data = this.data
    this.setData({ currentImgs: data.imgUrls })
  },

  methods: {
    change: function change(e) {
      this.setData({
        current: e.detail.current
      })
      this.triggerEvent('change', { current: e.detail.current }, {})
    },
    deleteImg: function deleteImg() {
      var data = this.data
      var imgs = data.currentImgs
      var url = imgs.splice(data.current, 1)
      this.triggerEvent('delete', { url: url[0], index: data.current }, {})
      if (imgs.length === 0) {
        this.hideGallery()
        return
      }
      this.setData({
        current: 0,
        currentImgs: imgs
      })
    },
    hideGallery: function hideGallery() {
      var data = this.data
      if (data.hideOnClick) {
        this.setData({
          show: false
        })
        this.triggerEvent('hide', {}, {})
      }
    },
    onSubmit(e) {
      this.triggerEvent('submit', e.detail)
    }
  }
})
