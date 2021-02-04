const app = getApp()
import { requestMessageDetailById } from '../../api/message'
import { postResumeToHr } from '../../api/user/resume'
const io = require('../../utils/weapp.socket.io')
// socket 连接地址
var socketUrl = 'ws://192.168.1.18:9999'
// socket 状态更新
var socketMessage = ''
// 上下文对象
var that
var socketMsgQueue = []
var socketOpen = false
Page({
  /**
   * 页面的初始数据
   */
  data: {
    role: null,
    id: -1,
    message: [],
    card: [],
    init: false,
    time: '',
  },
  sendSocketMessage(msg) {
    console.log(socketOpen)
    if (socketOpen) {
      const message = {
        Command: 'chat',
        Content: msg,
        RecvID: this.data.card.RID,
      }
      wx.sendSocketMessage({
        data: JSON.stringify(message),
        success: function (res) {
          console.log('发送成功', res)
        },
        fail: function (err) {
          console.error('发送失败', err)
        },
      })
    } else {
      socketMsgQueue.push(msg)
    }
  },
  onSubmitResume() {
    if (this.data.card.IsSendResume == 'True') {
      return
    }
    postResumeToHr({
      rid: this.data.card.RID,
      status: 99,
    }).then((res) => {
      console.log('发送简历', res)
      app.showToast(res.data.msg, () => {})
    })
  },
  onNavTo(e) {
    const { url } = e.currentTarget.dataset
    wx.navigateTo({
      url,
    })
  },
  onPhoneCall() {
    wx.makePhoneCall({
      phoneNumber: this.data.card.Phone,
    })
  },
  getList: function (pageNum = 1) {
    this.setData({
      loading: true,
    })
    requestMessageDetailById({
      pageindex: pageNum,
      pagesize: 10,
      id: this.data.id,
    })
      .then((res) => {
        console.log('聊天室信息', res)
        if (res.data.ret == 'success') {
          var data = res.data.dataList
          if (pageNum == 1) {
            this.setData({
              card: res.data.data,
            })
          }
          if (res.data.TotalCount - 10 * (pageNum - 1) <= 10) {
            this.setData({
              nomore: true,
              buttontext: '暂无更多数据',
              loading: false,
              pageNum: 0,
            })
          } else {
            this.setData({
              buttontext: '加载中..',
              loading: true,
              pageNum: pageNum,
            })
          }

          if (res.data.TotalCount > 0) {
            this.setData({
              list: pageNum == 1 ? data : this.data.list.concat(data),
              nomore: false,
            })
          } else {
            this.setData({
              list: [],
              nomore: true,
            })
          }
        } else {
          this.setData({
            list: [],
            nomore: true,
          })
        }
      })
      .catch(() => {
        this.setData({
          list: [],
          nomore: true,
        })
      })
      .finally(() => {
        this.setData({
          init: true,
        })
      })
  },
  onClose() {},
  onSend(e) {
    const value = e.detail
    // this.sendSocketMessage(value)
    const message = {
      Command: 'chat',
      Content: value,
      RecvID: this.data.card.RID,
    }
    this.socketInstance.send({
      data: JSON.stringify(message),
      success: (res) => {
        console.log(res)
      },
      fail: (err) => {
        console.error(err)
      }
    })
    // this.socketInstance.send({
    //   data: '123456798',
    //   success: (res) => {
    //     console.log(res)
    //   },
    //   fail: (error) => {
    //     console.error(error)
    //   },
    // })

    // this.socketSendMessage('message')
  },
  socketStart: function () {
    // 设置socket连接地址 socketUrl
    const socket = (this.socket = io(socketUrl))

    socket.on('connect', () => {
      this.setData({
        socketMessage: (socketMessage += 'SOCKET连接成功 → \n\n'),
      })

      // 此处修改为与server约定的数据、格式
      var sendMessage =
        '{"token":"v3jsoc8476shNFhxgqPAkkjt678","client":"发送内容"}'
      this.socketSendMessage(sendMessage)
    })

    socket.on('connect_error', (d) => {
      this.setData({
        socketMessage: (socketMessage += 'SOCKET连接失败 → \n\n'),
      })
    })

    socket.on('connect_timeout', (d) => {
      this.setData({
        socketMessage: (socketMessage += 'SOCKET连接超时 → \n\n'),
      })
    })

    socket.on('disconnect', (reason) => {
      this.setData({
        socketMessage: (socketMessage += 'SOCKET连接断开 → \n\n'),
      })
    })

    socket.on('reconnect', (attemptNumber) => {
      this.setData({
        socketMessage: (socketMessage += 'SOCKET正在重连 → \n\n'),
      })
    })

    socket.on('reconnect_failed', () => {
      this.setData({
        socketMessage: (socketMessage += 'SOCKET重连失败 → \n\n'),
      })
    })

    socket.on('reconnect_attempt', () => {
      this.setData({
        socketMessage: (socketMessage += 'SOCKET正在重连 → \n\n'),
      })
    })

    socket.on('error', (err) => {
      this.setData({
        socketMessage: (socketMessage += 'SOCKET连接错误 → \n\n'),
      })
    })

    socket.on('message', function (d) {
      this.setData({
        socketMessage: (socketMessage += '服务器返回数据 → \n\n'),
      })
      that.socketReceiveMessage(d)
    })
  },
  /**
   * 断开socket
   */
  socketStop: function () {
    if (this.socket) {
      this.socket.close()
      this.socket = null
    }
  },

  /**
   * 发送消息
   */
  socketSendMessage: function (sendStr) {
    if (this.socket) {
      this.setData({
        socketMessage: (socketMessage +=
          '向服务器发送数据 → ' + sendStr + '\n\n'),
      })
      this.socket.emit('message', sendStr)
    }
  },

  /**
   * 接收消息
   */
  socketReceiveMessage: function (receivedStr) {
    this.setData({
      socketMessage: (socketMessage +=
        '服务器返回数据 → ' + receivedStr + '\n\n'),
    })
    this.socketStop()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    app.getRoleInfos().then((res) => {
      this.setData({
        role: res.data,
      })
    })
    this.setData(
      {
        id: options.id,
        time: options.time,
      },
      () => {
        this.getList()
      }
    )

    this.socketInstance = wx.connectSocket({
      url: 'ws://192.168.1.18:9999/12',
      // header: {
      //   'content-type': 'application/json',
      // },
      success: (res) => {
        console.log('WebSocket连接创建', res)
      },
      fail: () => {},
    })
    wx.onSocketOpen(function (header) {
      console.log('onSocketOpen', header)
      socketOpen = true
      // const message = {
      //   Command: 'chat',
      //   Content: '我发送的消息',
      //   RecvID: that.data.card.RID,
      // }
      // wx.sendSocketMessage({
      //   data: JSON.stringify(message),
      // })
    })
    wx.onSocketMessage(function (res) {
      console.log('小程序接受消息', res)
    })
    wx.onSocketClose(function (res) {
      console.log('socket关闭', res)
    })
    // that = this
    // this.socketStart()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
