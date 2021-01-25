const app = getApp()
import { requestLetter } from '../../api/hr/message'
import { requestMessageList } from '../../api/message'
Component({
  data: {
    active: 0,
    tabs: [
      { title: '消息', value: 0 },
      { title: '站内信', value: 1 },
    ],
  },
  options: {
    addGlobalClass: true,
  },
  lifetimes: {
    attached: function () {
      console.log('消息')
      this.initList().then(() => {
        console.log(213)
        this.getLists()
      })
    },
    moved: function () {},
    detached: function () {},
  },
  pageLifetimes: {
    show: function () {},
    hide: function () {},
    resize: function () {},
  },
  methods: {
    onChatRoomTap() {
      wx.navigateTo({
        url: '/pages/chatroom/chatroom',
      })
    },
    onChange(e) {
      console.log(e)
      this.setData(
        {
          active: e.detail.index,
        },
        () => {
          this.getLists()
        }
      )
    },
    onTabsClick(e) {
      console.log(e)
      wx.navigateTo({
        url: '/sub-pages/hr-interview/hr-interview',
      })
    },
    initList() {
      var listTemp = []
      for (var i = 0; i < this.data.tabs.length; i++) {
        listTemp[i] = {}
        listTemp[i].pageNum = 1
        listTemp[i].loading = true
        listTemp[i].nomore = false
        listTemp[i].init = false
        listTemp[i].data = []
        listTemp[i].buttontext = '加载中...'
        listTemp[i].loadData = false
      }
      this.setData({
        initList: true,
        lists: listTemp,
      })
      return Promise.resolve()
    },
    getLists(pageNum = 1) {
      const { active, lists, tabs } = this.data
      let requestList = () => {}
      if (active == 0) {
        requestList = requestMessageList
      } else {
        requestList = requestLetter
      }
      requestList({
        pageindex: pageNum,
        pagesize: 20,
        status: tabs[active].value,
      })
        .then((res) => {
          console.log('列表', res)
          if (res.data.ret == 'success') {
            var data = res.data.dataList
            this.setData({
              loadData: true,
              [`lists[${active}].init`]: true,
            })

            if (res.data.TotalCount - 10 * (pageNum - 1) <= 10) {
              this.setData({
                [`lists[${active}].moreButton`]: true,
                [`lists[${active}].buttontext`]: '暂无更多数据',
                [`lists[${active}].loading`]: false,
                [`lists[${active}].pageNum`]: 0,
                [`lists[${active}].loadData`]: true,
              })
            } else {
              this.setData({
                [`lists[${active}].buttontext`]: '加载中..',
                [`lists[${active}].loading`]: true,
                [`lists[${active}].pageNum`]: pageNum,
              })
            }

            if (res.data.TotalCount > 0) {
              this.setData({
                [`lists[${active}].data`]:
                  pageNum == 1 ? data : lists[active].data.concat(data),
                [`lists[${active}].loadData`]: true,
              })
            } else {
              this.setData({
                [`lists[${active}].data`]: [],
                [`lists[${active}].nomore`]: true,
              })
            }
          } else {
            this.setData({
              [`lists[${active}].data`]: [],
              [`lists[${active}].nomore`]: true,
            })
          }
        })
        .catch((err) => {
          this.setData({
            [`lists[${active}].data`]: [],
            [`lists[${active}].nomore`]: true,
          })
        })
    },
    onReachBottom() {
      const { active, lists } = this.data
      lists[active].pageNum !== 0 && this.getLists(lists[active].pageNum + 1)
    },
  },
})
