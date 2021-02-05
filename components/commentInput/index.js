// components/commentInput/index.js
const app = getApp()
import basic from '../mixins/basic'
Component({
  options: {
    addGlobalClass: true,
  },
  behaviors: [basic],
  /**
   * 组件的属性列表
   */
  properties: {
    useSlotButton: {
      type: Boolean,
      value: true,
    },
    adjustPosition: {
      type: Boolean,
      value: true,
    },
    show: {
      type: Boolean,
      value: false,
    },
    aid: {
      type: Number,
    },
    fid: {
      type: Number,
    },
  },
  observers: {
    // show: function (show) {
    //   console.log(show)
    //   this.setData(
    //     {
    //       focus: show,
    //     },
    //     () => {
    //       show &&
    //         wx.pageScrollTo({
    //           scrollTop: 0,
    //         })
    //     }
    //   )
    // },
  },
  /**
   * 组件的初始数据
   */
  data: {
    focus: false,
    value: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSend() {
      this.triggerEvent('send', this.data.value)
    },
    onChange(e) {
      this.setData({
        value: e.detail,
      })
    },
    onConfirm(e) {
      console.log(e)
      let options = {
        id: this.data.aid,
        content: e.detail,
      }
      this.data.fid && (options.fid = this.data.fid)
      this.triggerEvent('send', e.detail)
      // app
      //   .comment(options)
      //   .then((res) => {
      //     this.$emit('success', res)
      //   })
      //   .catch((err) => {
      //     console.error(err)
      //   })
    },
    onBlur() {
      this.$emit('close')
    },
  },
})
