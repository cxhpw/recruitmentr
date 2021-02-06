const app = getApp()
import { requestMessageDetailById } from '../../api/message'
import { postResumeToHr } from '../../api/user/resume'
import { postMessage } from '../../api/chatroom'
const io = require('../../utils/weapp.socket.io')
// socket 连接地址
var socketUrl = app.globalData.roleInfo.IP
// var socketUrl = 'http://192.168.1.111:86'
// socket 状态更新
var socketMessage = ''
// 上下文对象
var that
var socketMsgQueue = []
var socketOpen = false
var isRef = true
var timer
Page({
  /**
   * 页面的初始数据
   */
  data: {
    state: 'leave',
    receiveID: 0,
    role: null,
    id: -1,
    message: [
      {
        type: 'my',
        avatar: app.globalData.user,
      },
    ],
    card: [],
    init: false,
    time: '',
  },
  sendSocketMessage(value) {
    return new Promise((resolve, reject) => {
      postMessage({
        recvid: this.data.receiveID,
        chatroomid: this.data.id,
        content: value,
      }).then((res) => {
        console.log(res)
        const { user, role } = this.data
        this.getList().then(() => {
          console.log('asdsad')
          this.bottom()
        })
        resolve()
      })
    })
  },
  // sendSocketMessage(value) {
  //   return new Promise((resolve, reject) => {
  //     const { user } = this.data
  //     if (socketOpen) {
  //       const message = {
  //         Command: 'chat',
  //         Content: value,
  //         RecvID: this.data.card.RID || this.data.card.JSID,
  //         SendID: app.globalData.roleInfo.AutoID,
  //         HeaderPhoto: user.HeaderPhoto,
  //       }
  //       this.socketInstance.send({
  //         data: JSON.stringify(message),
  //         success: function (res) {
  //           console.log('发送成功', res)
  //           const { list, user, role, status } = that.data
  //           list.push({
  //             type: role.Role,
  //             name: user.Name,
  //             content: value,
  //             avatar: user.HeaderPhoto,
  //             status: 0,
  //           })
  //           that.setData({
  //             list,
  //           })
  //           resolve()
  //         },
  //         fail: function (err) {
  //           console.log('发送失败', err)
  //           reject()
  //         },
  //       })
  //     } else {
  //       this.connectSocket().then(() => {
  //         this.sendSocketMessage(value)
  //       })
  //     }
  //   })
  // },
  connectSocket() {
    this.socketInstance = wx.connectSocket({
      url:
        socketUrl +
        `/${app.globalData.roleInfo.AutoID}/${this.data.receiveID}/${this.data.id}`,
      header: {
        'content-type': 'application/json',
      },
      method: 'post',
      success: (res) => {
        console.log('WebSocket创建成功', res)
      },
      fail: (err) => {
        console.log('WebSocket创建失败', err)
      },
    })
    this.initSocket()
    return Promise.resolve()
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
  bottom() {
    return new Promise((resolve, reject) => {
      wx.pageScrollTo({
        scrollTop: 100000,
        duration: 0,
        success: () => {
          resolve()
        },
      })
    })
  },
  getList: function (pageNum = 1) {
    this.setData({
      loading: true,
    })
    return requestMessageDetailById({
      pageindex: pageNum,
      pagesize: 10,
      id: this.data.id,
    })
      .then((res) => {
        console.log('聊天室信息', res)
        if (res.data.ret == 'success') {
          var data = res.data.dataList
          data.reverse()
          data = data.map((item) => {
            return {
              name: item.Name,
              type: item.UserType,
              content: item.Content,
              avatar: item.HeaderPhoto,
              status: item.Status,
              timeStamp: item.SendTime,
            }
          })
          if (pageNum == 1) {
            this.setData({
              card: res.data.data,
              receiveID: res.data.data.RID || res.data.data.JSID,
            })
            wx.setNavigationBarTitle({
              title:
                app.globalData.roleInfo.Role == 99
                  ? res.data.data.CName
                  : res.data.data.JSName,
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
        if (!this.data.init) {
          setTimeout(() => {
            this.bottom()
          }, 10)
          this.setData({
            init: true,
          })
        }
      })
  },
  onClose() {},
  onSend(e) {
    const value = e.detail
    console.log(value)
    if (!value) {
      return
    }
    this.sendSocketMessage(value).then(() => {
      this.selectComponent('#comment').setData({
        value: '',
      })
    })
  },
  socketStart: function () {
    // 设置socket连接地址 socketUrl
    const socket = (this.socket = io(socketUrl, {
      path: `/${app.globalData.roleInfo.AutoID}`,
      query: '',
    }))

    socket.on('connect', () => {
      console.log('SOCKET连接成功')
      this.setData({
        socketMessage: (socketMessage += 'SOCKET连接成功 → \n\n'),
      })

      // 此处修改为与server约定的数据、格式
      var sendMessage =
        '{"token":"v3jsoc8476shNFhxgqPAkkjt678","client":"发送内容"}'
      this.socketSendMessage(sendMessage)
    })

    socket.on('connect_error', (d) => {
      console.log('SOCKET连接失败')
      this.setData({
        socketMessage: (socketMessage += 'SOCKET连接失败 → \n\n'),
      })
    })

    socket.on('connect_timeout', (d) => {
      console.log('SOCKET连接超时')
      this.setData({
        socketMessage: (socketMessage += 'SOCKET连接超时 → \n\n'),
      })
    })

    socket.on('disconnect', (reason) => {
      console.log('SOCKET连接断开')
      this.setData({
        socketMessage: (socketMessage += 'SOCKET连接断开 → \n\n'),
      })
    })

    socket.on('reconnect', (attemptNumber) => {
      console.log('SOCKET正在重连')
      this.setData({
        socketMessage: (socketMessage += 'SOCKET正在重连 → \n\n'),
      })
    })

    socket.on('reconnect_failed', () => {
      console.log('SOCKET重连失败')
      this.setData({
        socketMessage: (socketMessage += 'SOCKET重连失败 → \n\n'),
      })
    })

    socket.on('reconnect_attempt', () => {
      console.log('SOCKET正在重连')
      this.setData({
        socketMessage: (socketMessage += 'SOCKET正在重连 → \n\n'),
      })
    })

    socket.on('error', (err) => {
      console.log('SOCKET连接错误')
      this.setData({
        socketMessage: (socketMessage += 'SOCKET连接错误 → \n\n'),
      })
    })

    socket.on('message', function (d) {
      console.log('服务器返回数据')
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
  initSocket() {
    wx.onSocketOpen((header) => {
      console.log('socket成功', header)
      socketOpen = true
    })
    this.socketInstance.onOpen(() => {})
    this.socketInstance.onMessage((res) => {
      const data = JSON.parse(res.data)
      console.log('接受到新的消息', data)
      const { list, role, status } = this.data
      if (data.Command == 'chat') {
        list.push({
          type: role.Role == 1 ? 99 : 1,
          name: '',
          content: data.Msg.Content,
          avatar: data.Msg.HeaderPhoto,
          status: status == 'leave' ? 1 : 99,
        })
        this.setData(
          {
            list,
          },
          () => {
            this.bottom()
          }
        )
      } else {
        this.setData({
          status: data.Command,
        })
      }
    })
    this.socketInstance.onError((err) => {
      console.log('socket连接失败', err)
    })
    this.socketInstance.onClose(() => {
      console.log('socket链接关闭')
      // if (isRef) {
      //   this.connectSocket()
      // }
      socketOpen = false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    app.getRoleInfos().then((res) => {
      this.setData({
        role: res.data,
      })
    })
    socketUrl =
      'wss://' + app.globalData.roleInfo.IP + `:${app.globalData.roleInfo.Port}`
    this.setData(
      {
        id: options.id,
        receiveID: options.receiveID,
        time: options.time,
        user:
          app.globalData.roleInfo.Role == 99
            ? app.globalData.userInfo
            : app.globalData.hrInfo,
      },
      () => {
        // this.connectSocket()
      }
    )
    // this.socketStart()
    timer = setInterval(() => {
      this.getList()
    }, 1500)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.connectSocket()
    // this.getList()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // isRef = false
    // this.socketInstance.close({
    //   code: 1000,
    //   success: () => {},
    // })
    clearInterval(timer)
  },

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
