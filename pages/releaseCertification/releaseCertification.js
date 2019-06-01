// pages/releaseCertification/releaseCertification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tel:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: getApp().url + "/user.renzheng/rzprice",
      data: {
      },
      method: "POST",
      success: (res) => {
        console.log(res.data.data);
        this.setData({
          rzfy: res.data.data,
        })
      }
    })
  },
submitForm(e){
console.log(e.detail.value);
  wx.request({
    url: getApp().url + "/user.renzheng",
    data: {
      userid: wx.getStorageSync('user').id,
      name: e.detail.value.name,
      cardnum: e.detail.value.cardnum,
      tel: e.detail.value.tel,
      code: e.detail.value.code,
    },
    method: "POST",
    success: (res) => {
      console.log(res.data.data);
      if (res.data.code == 200) {
        this.pay(res.data.data)
        
      }else{
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false
        })
       
      }  
    }
  })
},
  pay: function (res) {
    const that = this;
    wx.showLoading({
      title: '支付中',
    })
    console.log(res);
    wx.requestPayment({
      timeStamp: '' + res.timeStamp,
      nonceStr: res.nonceStr,
      package: res.package,
      signType: 'MD5',
      paySign: res.paySign,
      success: function (res) {
        wx.hideLoading();
        if (res.errMsg == 'requestPayment:ok') {
          wx.showToast({
            title: '支付成功',
            mask: true,
            duration: 1000,
            icon: 'success'
          })
          let timer = setTimeout(function () {
             wx.switchTab({
               url: "../personal/personal"
              })
            clearTimeout(timer);
          }, 1000);
        } else {
          wx.showModal({
            title: '提示',
            content: '支付失败',
            showCancel: false
          })
        }
      },
      fail: function (res) {
        console.log(res);
        wx.hideLoading();
      }
    })
  },
  printdend(e){
    this.setData({
      tel: e.detail.value
    })
    
  },

  getCode(e){
    if (this.data.tel!="") {
      wx.request({
        url: getApp().url + "/user.renzheng/ajaxcode",
        data: {
          tel: this.data.tel,
        },
        method: "POST",
        success: (res) => {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false,
          })

        }
      })
    } else {
      this.getCode()
    }
    

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