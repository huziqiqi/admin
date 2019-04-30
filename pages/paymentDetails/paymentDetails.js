// pages/paymentDetails/paymentDetails.js
let reuslt = new Date();
let year = reuslt.getFullYear();
let month = reuslt.getMonth() < 10 ? '0' + reuslt.getMonth() : reuslt.getMonth();
let temp = [];
temp.push(year);
temp.push(month);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: temp,
    type: 0,
    pages: 1,
    state: 4
  },

  bindChange(e) {
    const val = e.detail.value
    this.setData({
      date: val.split('-')
    })
    this.request()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.request()
  },
  changeOil(e) {
    this.setData({
      type: parseInt(e.target.dataset.type),
    })
    this.request()
  },
  changeOil2(e) {
    this.setData({
      state: parseInt(e.currentTarget.dataset.state),
    })
    this.request()
  },

  Unittesting() {
    type == 1
  },
  request() {
    let date = this.data.date.join('-')
    wx.request({
      url: getApp().url + "//user.myprice/orderlist",
      data: {
        userId: wx.getStorageSync('user').id,
        type: this.data.type,
        state: this.data.state,
        date,
        pages: this.data.pages
      },
      method: "POST",
      success: (res) => {

        if (res.data.data.num == 0) {
          wx.showToast({
            title: "暂无收支明细",
            icon: "none"
          })
        } else {
          this.setData({
            items: res.data.data.orderlists,
          })
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