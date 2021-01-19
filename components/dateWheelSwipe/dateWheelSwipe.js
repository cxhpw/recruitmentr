// components/dateWheelSwipe/dateWheelSwipe.js
const DateManager = require('../../utils/day.js')
var basic = require('../mixins/basic')

Component({
  behaviors: [basic],
  /**
   * 组件的属性列表
   */
  properties: {
    selectedDate: {
      type: String
    },
    firstDayBeforeDateSelection: {
      type: Number,
      value: 0
    },
    data: {
      type: Array
    },
    numberOfDays: {
      type: Number,
      value: 105
    },
    dateValueFormat: {
      type: String,
      value: 'YYYYMMDD'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    dates: [],
    scrollX: 0,
    weeks: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    currentIndex: null
  },

  lifetimes: {
    created: function() {},
    attached: function() {},
    ready: function() {
      // console.log(this.data.selectedDate);
      this._buildDates(this.data.selectedDate)
    }
  },
  pageLifetimes: {
    hide: function() {}
  },
  observers: {},
  /**
   * 组件的方法列表
   */
  methods: {
    setCurrentIndexByDate: function(date) {
      let currentIndex = this.data.firstDayBeforeDateSelection + 1
      for (var i = 0; i < this.data.dates.length; i++) {
        currentIndex = this.data.dates[i].date === date ? i : currentIndex
      }
      this.setData({
        currentIndex: currentIndex
      })
    },
    _buildDates(selectedDate) {
      let dateTemp = []
      if (!selectedDate) {
        selectedDate = new Date()
      }
      selectedDate = DateManager(selectedDate)

      let startDate = selectedDate.subtract(
        this.data.firstDayBeforeDateSelection,
        'day'
      )
      let now = DateManager()
      startDate.isBefore(now) && (startDate = now)
      let iterationDate = startDate.clone()
      let endDate = startDate.add(this.data.numberOfDays, 'day')

      while (iterationDate.isBefore(endDate)) {
        dateTemp.push({
          isNow: iterationDate.isSame(now, 'day'),
          date: iterationDate.format(this.data.dateValueFormat),
          isActive: iterationDate.isSame(selectedDate, 'day'),
          weekday: iterationDate.day(),
          day: iterationDate.format('D'),
          ISO: iterationDate.format('M月D日')
        })
        iterationDate = iterationDate.add(1, 'day')
      }
      this.setData(
        {
          dates: dateTemp
        },
        function() {
          this.setCurrentIndexByDate(
            selectedDate.format(this.data.dateValueFormat)
          )
          this.scrollCenter()
        }
      )
    },
    onDateTap: function(e) {
      const { date, index } = e.currentTarget.dataset
      this.setData({
        dates: this.data.dates.map(item => {
          item.isActive = item.date === date
          return item
        })
      })
      this.triggerEvent('select', date)
      wx.nextTick(() => {
        this.setCurrentIndexByDate(date)
        this.scrollCenter()
      })
    },
    scrollCenter: function() {
      const _self = this
      const { currentIndex } = this.data
      const clientWidth = wx.getSystemInfoSync().windowWidth / 2
      // console.log("clientWidth", clientWidth, currentIndex);
      Promise.all([
        this.getRect('.date-cell', true),
        this.getRect('.date-slider')
      ]).then(([cellRects, sliderRect]) => {
        const cellRect = cellRects[currentIndex]
        const offsetLeft = cellRects
          .slice(0, currentIndex)
          .reduce((prev, curr) => prev + curr.width + 4, 0)
        // console.log("scrollCenter", offsetLeft, sliderRect.width);
        this.setData({
          scrollX: offsetLeft - (sliderRect.width - cellRect.width * 2) / 2
        })
      })
    }
  }
})
