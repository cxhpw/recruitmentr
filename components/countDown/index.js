// components/order/countDown/index.js
var app = getApp();
var timer = null;
import Countdown from '../../utils/Countdown';

Component({
  externalClasses: ['custom-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    countdown: {
      type: String,
      observer: "_countdown"
    },
    isPrefix: {
      type: Boolean,
      value: true
    },
    oid: {
      type: Number,
    },
    custom: {
      type: Boolean,
      value: false
    }
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  pageLifetimes: {
    hide: function(){
      clearTimeout(timer)
    }
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
    _countdown: function (countDown) {
      var _self = this;
      console.log("=========start===========", countDown);
      timer = new Countdown({
        date: new Date(countDown).getTime(),
        render(date) {
          const hours = this.leadingZeros(date.hours, 2) != "00" ? this.leadingZeros(date.hours, 2) + '' : "";
          const min = this.leadingZeros(date.min, 2) ;
          const sec = this.leadingZeros(date.sec, 2) ;
          _self.setData({
            hours: hours,
            min: min,
            sec: sec,
          });
        },
        onEnd() {
          clearTimeout(timer);
          _self.triggerEvent('countDownEnd', {
            oid: _self.data.oid
          });
        },
      })
    }
  }
})