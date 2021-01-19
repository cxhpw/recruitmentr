// components/calendar/index.js
import dayjs from '../../utils/day'
import basic from '../mixins/basic'
Component({
  externalClasses: ['custom-class'],
  behaviors: [basic],
  /**
   * 组件的属性列表
   */
  properties: {
    activities: {
      type: Array,
    },
    selectedDate: {
      type: String,
    },
    dateValueFormat: {
      type: String,
      value: 'YYYYMMDD',
    },
    beforeMonth: {
      type: String,
      value: null,
    },
    endData: {
      type: String,
      value: null,
    },
    currentDate: {
      type: String,
      value: null,
    },
    maxMonthShow: {
      type: Number,
      value: 1,
    },
  },
  observers: {
    currentDate: function (value) {
      this.setData({
        _currentDate: null,
      })
    },
    activities: function (value) {
      console.log('=======activities', value)
    },
    beforeMonth: function (value) {
      console.log('beforeMonth', value)
      this.setData({
        earliestDate: dayjs().startOf('month').subtract(value, 'month'),
      })
    },
  },
  lifetimes: {
    created: function () {
      console.log('created')
      this.setData({
        earliestDate: dayjs().startOf('month'),
        latestDate: dayjs().startOf('month').add(4, 'month'),
      })
    },
    attached: function () {
      console.log('attached')
      this.createCalendar()
    },
    ready: function () {
      // this.$emit('select', { date: 123456 })
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    days_array: ['日', '一', '二', '三', '四', '五', '六'],
    _currentDate: undefined,
    earliestDate: null,
    latestDate: null,
    dates: null,
    months: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onSwitcher(e) {
      const { type } = e.currentTarget.dataset
      var this_moment = dayjs(`${this.data.years[0]}-${this.data.months[0]}-1`)
      var back = this_moment.clone().subtract(1, 'month').startOf('day')
      var forward = this_moment.clone().add(1, 'month').startOf('day')

      type == 'prev' ? this.createCalendar(back) : this.createCalendar(forward)
    },
    createCalendar(switcher) {
      var next_month = dayjs(switcher || this.data._currentDate)
        .add(1, 'month')
        .startOf('month')
        .startOf('day')
      var past_month = dayjs(switcher || this.data._currentDate)
        .subtract(1, 'month')
        .endOf('month')
        
      if (next_month.isAfter(this.data.latestDate)) {
        this.setData({
          right_hidden: true,
        })
        return
      } else if (past_month.isBefore(this.data.earliestDate)) {
        this.setData({
          left_hidden: true,
        })
        return
      } else {
        this.setData({
          right_hidden: false,
          left_hidden: false
        })
      }


      var array = this.calendarArrays(
        this.data.startDate,
        this.data.endDate,
        this.data._currentDate,
        switcher
      )
      this.setActivities(array)

      

      // this.setData(
      //   {
      //     right_hidden: false,
      //     left_hidden: false,
      //   },
      //   () => {
      //     if (next_month.isAfter(this.data.latestDate)) {
      //       this.setData({
      //         right_hidden: true,
      //       })
      //     }

      //     if (past_month.isBefore(this.data.earliestDate)) {
      //       this.setData({
      //         left_hidden: true,
      //       })
      //     }
          
      //   }
      // )
    },
    calendarArrays(start, end, current, switcher) {
      let monthsInRange = []
      let months = []
      let years = []
      current = dayjs(current || start || end).startOf('d')
      let now = dayjs().startOf('d')
      for (let i = 0; i < this.data.maxMonthShow; i++) {
        let daysInRange = []
        let reference = switcher || current || start || end
        let startRange = dayjs(reference).startOf('month').startOf('week')
        let endRange = dayjs(reference).endOf('month')
        let d = startRange.clone()
        while (d.isBefore(endRange)) {
          daysInRange.push({
            str: d.format('D'),
            date: d.format(this.data.dateValueFormat),
            year: endRange.get('year'),
            month: endRange.get('month') + 1,
            start: start && d.isSame(start, 'day'),
            end: end && d.isSame(end, 'day'),
            today: d.isSame(now, 'day'),
            current: current && d.isSame(current, 'day'),
            past: d.isBefore(now),
            selected: start && end && d.isBetween(start, end),
            outside:
              d.isBefore(this.data.earliestDate) ||
              d.isAfter(this.data.latestDate),
            /* 判断是否同一个月 */
            fade: !d.isSame(reference, 'month'),
          })
          d = d.add(1, 'day')
        }
        current = current.add(1, 'month').startOf('day')
        monthsInRange.push(daysInRange)
        months.push(endRange.get('month') + 1)
        years.push(endRange.get('year'))
      }
      this.setData({
        months: months,
        years: years,
      })
      return monthsInRange
    },
    setActivities(months) {
      const { activities } = this.data
      months = months.map((month) => {
        let monthTemp = month.map((date, index) => {
          activities.forEach((activity) => {
            if (activity == date.date) {
              date.activity = true
            }
          })
          return date
        })
        return monthTemp
      })
      this.setData({
        dates: months,
      })
    },
    onDateTap: function (e) {
      const { date, monthindex, dateindex } = e.currentTarget.dataset
      this.setData({
        [`dates[${monthindex}]`]: this.data.dates[monthindex].map((item) => {
          item.current = item.date === date
          return item
        }),
        _currentDate: dayjs(date),
      })
      this.$emit('select', { date })
    },
  },
})
