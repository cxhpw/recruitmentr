// components/sortComponent/index.js
import basic from '../mixins/basic'
var app = getApp()
var x, y, x1, y1, x2, y2, row
Component({
  behaviors: [basic],
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: false,
    },
    fileList: {
      type: Array,
      value: [],
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    current: -1,
    mt: 10,
    mr: 10,
    item_w: 100,
    item_h: 100,
    all_width: '', //总的宽度
    move_x: '',
    move_y: '',
    _fileList: [],
  },
  observers: {
    show: function(show) {
      if(show){

      }
    },
    fileList: function (fileList) {
      if (!fileList.length) {
        return
      }
      console.log('===========', fileList)
      wx.getSystemInfo({
        success: (res) => {
          console.log(res)
          var width = (this.data.all_width = res.windowWidth),
            _w = 0,
            row = 0,
            column = 0
          console.log(width)
          var arr = [].concat(fileList)
          arr.forEach((n, i) => {
            n.left = (this.data.item_w + this.data.mr) * row + this.data.mr
            n.top = (this.data.item_h + this.data.mt) * column + this.data.mt
            n._left = n.left
            n._top = n.top
            _w += this.data.item_w + this.data.mr
            if (_w + this.data.item_w + this.data.mr > width) {
              _w = 0
              row = 0
              column++
            } else {
              row++
            }
          })
          console.log('row', row, column)
          this.setData({
            _fileList: arr,
            height:
              (column + 1) * this.data.item_h + this.data.mt * (column + 1),
          })
        },
      })
    },
  },
  lifetimes: {
    created: function () {},
    attached: function () {},
    ready: function () {
      // this.$emit('select', { date: 123456 })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    movestart: function (e) {
      console.log('start', e)
      // currindex = e.target.dataset.index;
      // this.data.current = e.target.dataset.index;
      x = e.touches[0].clientX
      y = e.touches[0].clientY
      x1 = e.currentTarget.offsetLeft
      y1 = e.currentTarget.offsetTop
      // var arr = [].concat(this.data.fileList);
      // arr.forEach(function(n,i){
      //   n._class='move';
      //   n._style='';
      // });
      console.log()
      this.setData({
        current: e.target.dataset.index,
        move_x: x1,
        move_y: y1,
      })
    },
    move: function (e) {
      // // console.log('move',e.target.dataset.current);
      x2 = e.touches[0].clientX - x + x1
      y2 = e.touches[0].clientY - y + y1
      // // this.setData({
      // //   current: currindex,
      // //   start: { x: x2, y: y2 }
      // // })
      var underIndex = this.getCurrnetUnderIndex()

      console.log(arr, underIndex)
      // var now_current=this.data.current;
      if (underIndex != null && underIndex != this.data.current) {
        console.log(213)

        var arr = [].concat(this.data._fileList)
        this.changeArrayData(arr, underIndex, this.data.current)
        // console.log(underIndex);
        // now_current = underIndex;
        this.setData({
          _fileList: arr,
          current: underIndex,
        })
      }
      // console.log(this.data.current,arr);

      this.setData({
        move_x: x2,
        move_y: y2,
      })
    },
    moveend: function (e) {
      this.setData({
        current: -1,
      })
      // console.log(this)
      this.$emit('success', { fileList: this.data._fileList })
    },
    changeArrayData: function (arr, i1, i2) {
      console.log('changeArrayData', arr)
      var temp = arr[i1]
      arr[i1] = arr[i2]
      arr[i2] = temp

      var _left = arr[i1]._left,
        _top = arr[i1]._top
      arr[i1]._left = arr[i2]._left
      arr[i1]._top = arr[i2]._top
      arr[i2]._left = _left
      arr[i2]._top = _top

      var left = arr[i1].left,
        top = arr[i1].top
      arr[i1].left = arr[i2].left
      arr[i1].top = arr[i2].top
      arr[i2].left = left
      arr[i2].top = top
    },
    getCurrnetUnderIndex: function () {
      //获取当前移动下方index
      var endx = x2 + this.data.item_w / 2,
        endy = y2 + this.data.item_h / 2
      var v_judge = false,
        h_judge = false,
        column_num =
          ((this.data.all_width - this.data.mr) /
            (this.data.mr + this.data.item_w)) >>
          0
      // console.log(endx,endy);
      var _column =
        ((endy - this.data.mt) / (this.data.item_h + this.data.mt)) >> 0
      var min_top =
          this.data.mt + _column * (this.data.item_h + this.data.mt),
        max_top = min_top + this.data.item_h
      // console.log('v', _column, endy, min_top, max_top);
      if (endy > min_top && endy < max_top) {
        v_judge = true
      }
      var _row =
        ((endx - this.data.mr) / (this.data.item_w + this.data.mr)) >> 0
      var min_left = this.data.mr + _row * (this.data.item_w + this.data.mr),
        max_left = min_left + this.data.item_w
      // console.log('x', _row, endx, min_left, max_left);
      if (endx > min_left && endx < max_left) {
        h_judge = true
      }
      if (v_judge && h_judge) {
        var index = _column * column_num + _row
        if (index > this.data._fileList.length - 1) {
          //超过了
          return null
        } else {
          return index
        }
      } else {
        return null
      }
    },
  },
})
