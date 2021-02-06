import { getTimeStr, encrypt } from '../../utils/util'
import { requestCompanyFilter } from '../../api/config'
import { postCompanyRegister } from '../../api/hr/register'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    header: {
      'Content-Type': 'multipart/form-data',
    },
    formData: {
      apiname: 'uploadfile',
      customrdsession: wx.getStorageSync('LogiSessionKey'),
      encrypttime: encodeURIComponent(
        encrypt(getTimeStr(Date.now(), 'datetime', true))
      ),
    },
    form: {},
    fileList: [],
    loadData: false,
    content: '',
    showSelect: true,
    showRemoveIcon: true,
    region: [],
    date: '',
    industry: [],
    industryValue: -1,
    companySize: [],
    companyValue: -1,
  },
  /* 图片上传 */
  onBefore() {
    wx.showLoading({
      mask: true,
    })
  },
  onSuccess(e) {
    var { file, fileList } = e.detail
    var { res } = file
    var { type } = e.currentTarget.dataset

    this.setData(
      {
        [`fileList`]: fileList
          .filter((item) => {
            return item.status == 'done'
          })
          .map((item) => {
            return {
              uid: item.uid,
              url: item.url,
            }
          }),
      },
      () => {
        wx.hideLoading()
        this.setData({
          showSelect: this.data[`fileList`].length >= 1 ? false : true,
        })
      }
    )
  },
  onComplete(e) {
    console.log('onComplete', e)
    wx.hideLoading()
  },
  onPreview(e) {
    var { type } = e.currentTarget.dataset
    console.log('onPreview', e)
    const { file, fileList } = e.detail
    wx.previewImage({
      current: file.url,
      urls: fileList.map((n) => n.url),
    })
  },
  onRemove(e) {
    var { type } = e.currentTarget.dataset
    const { file, fileList } = e.detail
    console.log('remove', e)
    var temp = this.data[`fileList`].filter((n) => {
      return n.uid != file.uid
    })

    console.log('temp', temp)
    this.setData({
      [`fileList`]: temp,
      showSelect: temp.length < 1 ? true : false,
    })
  },
  onIndustryChange(e) {
    this.setData({
      industryValue: e.detail.value,
    })
  },
  onCompanySizeChange(e) {
    this.setData({
      companyValue: e.detail.value,
    })
  },
  valid(value) {
    if (!value.shortCompany) {
      return app.showToast('请输入公司简称')
    } else if (value.industryValue == -1) {
      return app.showToast('请选择公司行业')
    } else if (value.companyValue == -1) {
      return app.showToast('请选择公司规模')
    } else if (!this.data.fileList.length) {
      return app.showToast('请上传企业营业执照')
    } else if (
      !value.creditNumber &&
      !value.taxpayerNumber &&
      !value.businessNumber
    ) {
      return app.showToast(
        '请填写统一社会信用代码，纳税人识别号，工商注册号 其中一项'
      )
    } else if (
      value.creditNumber.length &&
      !/^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/.test(
        value.creditNumber
      )
    ) {
      return app.showToast('请输入正确统一社会信用码')
    } else if (
      value.taxpayerNumber.length &&
      !/[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/.test(
        value.taxpayerNumber
      )
    ) {
      return app.showToast('请输入正确纳税人识别号')
    } else if (
      value.businessNumber.length &&
      !/^[1-7]\d{14}$/.test(value.businessNumber)
    ) {
      return app.showToast('请输入正确工商号')
    }
    return true
  },
  onSubmit(e) {
    const { value } = e.detail
    console.log(value)
    if (this.valid(value)) {
      const { form, industry, companySize, fileList } = this.data
      wx.showLoading({
        mask: true,
      })
      let temp = {
        headerphoto: form.avatar,
        name: form.name,
        job: form.jop,
        companyname: form.longCompany,
        abbreviat: value.shortCompany,
        industry: industry[value.industryValue],
        staffsize: companySize[value.companyValue],
        license: fileList[0].url,
        creditcode: value.creditNumber,
        identifier: value.taxpayerNumber,
        regnumber: value.businessNumber,
        Province: form.province,
        City: form.City,
        District: form.district,
        Address: form.address,
        Longitude: form.longitude,
        Latitude: form.latitude,
      }
      postCompanyRegister(temp)
        .then((res) => {
          console.log(res)
          wx.hideLoading()
          app.showToast(res.data.msg, () => {
            wx.reLaunch({
              url: `/sub-pages/main/main?tabIndex=${2}`,
            })
          })
        })
        .catch((err) => {
          console.error(err)
        })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url: app.api.host + '/include/getdata',
      form: JSON.parse(options.formData),
    })
    requestCompanyFilter().then((res) => {
      console.log(res)
      this.setData({
        companySize: res.data[0].keyvalue,
        industry: res.data[1].keyvalue,
      })
    })
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

})
