const app = getApp()
import { postReleaseJop, requestDetailById } from '../../api/hr/releaseManage'
import { requestResumeFilter } from '../../api/config'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    data: null,
    id: -1,
    experience: ['不限', '一年以内', '1-3年内', '3-5年内'],
    experienceValue: -1,
    education: ['小学', '初中', '高中', '大学'],
    educationValue: -1,
    salary: [
      ['5K-6K', '5K-6K'],
      ['12个月', '13个月', '14个月'],
    ],
    // salaryValue: [-1, -1],
    salaryValue: -1,
    form: {},
  },
  onExperienceChange(e) {
    this.setData({
      experienceValue: e.detail.value,
    })
  },
  onEducationChange(e) {
    this.setData({
      educationValue: e.detail.value,
    })
  },
  onSalaryChange(e) {
    console.log(e)
    this.setData({
      salaryValue: e.detail.value,
    })
  },
  onSalaryColumnChange() {},
  valid() {
    if (this.data.experienceValue == -1) {
      return app.showToast('请选择经验要求')
    } else if (this.data.educationValue == -1) {
      return app.showToast('请选择学历要求')
    } else if (this.data.salaryValue == -1) {
      return app.showToast('请选薪资范围')
    }
    return true
  },
  onSubmit() {
    if (this.valid()) {
      const {
        form,
        experience,
        experienceValue,
        education,
        educationValue,
        salary,
        salaryValue,
      } = this.data
      postReleaseJop({
        action: this.data.id == -1 ? 'add' : 'modify',
        id: this.data.id,
        name: form.position.Name,
        desc: form.desc,
        address: form.address.address,
        housenumber: form.housenumber,
        latitude: form.address.latitude,
        longitude: form.address.longitude,
        type: form.type,
        workplace: form.address.name,
        experience: experience[experienceValue],
        educat: education[educationValue],
        salary: salary[salaryValue],
        province: form.province,
        city: form.city,
        district: form.district,
        business_area: form.business_area,
      })
        .then((res) => {
          app.showToast(res.data.msg, () => {
            if (res.data.ret == 'success') {
              wx.navigateBack({
                delta: 2,
              })
              app.globalData.isRef = true
            }
          })
        })
        .catch((err, options) => {
          console.error(err, options)
        })
    }
  },
  getDetail(id) {
    requestDetailById(id).then((res) => {
      console.log('详情', res)
      const data = res.data
      this.setData({
        data: res.data,
        experienceValue: this.data.experience.indexOf(data.Experience),
        educationValue: this.data.education.indexOf(data.Educat),
        salaryValue: this.data.salary.indexOf(data.Salary),
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      form: JSON.parse(options.formData),
      id: options.id || -1,
    })
    requestResumeFilter().then((res) => {
      console.log('筛选', res)
      this.setData({
        experience: res.data[2].keyvalue,
        education: res.data[0].keyvalue,
        salary: res.data[1].keyvalue,
      }, () => {
        if (options.id != -1) {
            this.getDetail(options.id)
        }
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
  onHide: function () {
    app.globalData.selectPostion = []
  },

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
