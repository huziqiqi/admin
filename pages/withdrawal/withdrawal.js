// pages/withdrawal/withdrawal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount: 0,
    price: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
   

  },


  request() {
    wx.request({
      url: getApp().url + "//user.myprice",
      data: {
        userId: wx.getStorageSync('user').id
      },
      method: "POST",
      success: (res) => {
        this.setData({
          item: res.data.data
        })
      }
    })
  },
  mobileInput(e) {

    this.setData({
      price: e.detail.value
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
    this.request()
  },
  submitForm(e) {
    wx.request({
      url: getApp().url + "//user.myprice/cash",
      data: {
        userId: wx.getStorageSync('user').id,
        price: e.detail.value.meony
      },
      method: "POST",
      success: (res) => {
        wx.showToast({
          title: res.data.msg,
          icon: "none"
        })
        this.request()
        // this.setData({
        //   item:
        // })
      }
    })
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