const package = require('../package.json')
const fs = require('fs')
const path = require('path')
const { log } = require('./utils')
const shell = require('shelljs')
const app = require('../app.json')
let srcRoot = path.join(process.cwd(), '.')
let pageRoot = path.join(srcRoot, './pages')
let page = process.argv.slice(2)[0]
let pageTitle = process.argv.slice(2)[1]


if (!page) {
  log.error('请输入页面名称 $ npm run || yarn new pageName [navigationBarTitleText]')
  shell.exit(1)
}
let dir = path.join(pageRoot, page)
//  E:\companyFile\珠海美容\project\zhuhai-shop\pages\my\my

if (fs.existsSync(dir)) {
  log.error(`已存在页面${page}`)
  shell.exit(1)
}

page = page.split('/')[1] ? page.split('/')[1] : page.split('/')[0]

let pagePath = (dir + `/${page}`)
  .split(`\\${package.name}\\`)[1]
  .replace(/\\/gi, '/')

app.pages.push(pagePath)

let wxml = `<view class="page">${pagePath}</view>`

let scss = `@import "${path
  .relative(dir, path.join(__dirname, '../scss'))
  .replace(/\\/gi, '/')}/minxi/minxi.scss";
@import "${path
  .relative(dir, path.join(__dirname, '../scss'))
  .replace(/\\/gi, '/')}/variable/variable.scss";
`
let json = `{
  "usingComponents": {},
  "navigationBarTitleText": "${pageTitle || ''}"
}
`
let js = `const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
`
let wxss = ''
fs.mkdirSync(dir)
// console.log(page)
fs.writeFileSync(path.join(dir, `${page}.js`), js)
fs.writeFileSync(path.join(dir, `${page}.scss`), scss)
fs.writeFileSync(path.join(dir, `${page}.wxml`), wxml)
fs.writeFileSync(path.join(dir, `${page}.json`), json)
fs.writeFileSync(path.join(dir, `${page}.wxss`), wxss)
fs.writeFileSync(
  path.resolve(__dirname, `../app.json`),
  JSON.stringify(app, null, 2)
)
log.info(`成功创建页面${page}，需要重启服务...`)
