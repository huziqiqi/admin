// pages/add_address/add_address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: '请选择收货地址',
    customItem: '全部',
    address:"",
    msg: "",
    addressId: 0,
    isAdd: false,
    userId: "",
    type: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "添加地址"
    })
    this.setData({
      userId: options.userId,
      type: options.type
    })
    if (options.type == 1) {
      wx.setNavigationBarTitle({
        title: "添加收货地址"
      })
    } else {
      wx.setNavigationBarTitle({
        title: "添加自提点"
      })
    }
  },


  formSubmit(e) {
    let value = e.detail.value
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (value.sname.length < 1) {
      this.setData({
        msg: '请填写联系人姓名！'
      })
    } else if (value.tel.length < 1) {
      this.setData({
        msg: '请填写联系电话！'
      })
    } else if (!reg.test(value.tel)) {
      this.setData({
        msg: '联系电话格式错误'
      })
    } else if (this.data.region == '请选择收货地址') {
      this.setData({
        msg: '请选择商铺所在区域！'
      })
    } else if (e.detail.value.address.length < 1) {
      this.setData({
        msg: '请填写详细地址！'
      })
    } else {
      wx.showLoading({
        title: '请稍等',
      })
      let opt = {
        sname: value.sname,
        tel: value.tel,
        provinces: value.provinces.join(""),
        address: value.address,
        type: this.data.type
      }
      if (this.data.addressId == 0) {
        this.addAddress(opt)
      } else {
        this.updataAddress(opt)
      }

    }
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  getAddress(id) {
    wx.request({
      url: getApp().url + "/detailAddress",
      data: {
        userId: wx.getStorageSync('user').id,
        addressId: id,
      },
      method: "POST",
      success: (res) => {
        let reg = /(.*省|.*市|.*区|.*县)/
        let region = [];
        region = res.data.data.provinces.split(reg);
        region = region.split(reg);
        region[0] = region[1]
        region[1] = region[3]
        region[2] = region[5]
        let test = region
        this.setData({
          address: res.data.data,
          region
        })
      }
    })
  },
  updataAddress(opt) {
    wx.request({
      url: getApp().url + "/editAddress",
      data: {
        addressId: this.data.addressId,
        sname: opt.sname,
        userId: wx.getStorageSync('user').id,
        sname: opt.sname,
        tel: opt.tel,
        provinces: opt.provinces,
        address: opt.address,
      },
      method: "POST",
      success: (res) => {
        this.setData({})
      }
    })
  },
  addAddress(opt) {
    wx.request({
      url: getApp().url + "/addAddress",
      data: {
        userId: wx.getStorageSync('user').id,
        sname: opt.sname,
        tel: opt.tel,
        provinces: opt.provinces,
        address: opt.address,
        type: this.data.type
      },
      method: "POST",
      success: (res) => {
        wx.hideLoading()
        if (res.data.code == 200) {
          wx.showToast({
            title: res.data.msg
          })
          setTimeout(() => {
            wx.navigateBack({
              dalta: 1
            })
          }, 1000);
        } else {
          wx.showToast({
            title: res.data.msg
          })
        }

      }
    })
  },
  getUserAddress() {
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.address']) {
          wx.chooseAddress({
            success: (res) => {

              var region = [res.provinceName, res.cityName, res.countyName]
              this.setData({
                sname: res.userName,
                tel: res.telNumber,
                region,
                address: res.detailInfo
              })
            }
          })
        } else {
          if (res.authSetting['scope.address'] == false) {
            wx.openSetting({
              success(res) {}
            })
          } else {
            wx.chooseAddress({
              success: (res) => {
                var region = [res.provinceName, res.cityName, res.countyName]
                this.setData({
                  userName: res.userName,
                  userPhone: res.telNumber,
                  region,
                  userAddress: res.detailInfo
                })
              }
            })
          }
        }
      }
    })
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