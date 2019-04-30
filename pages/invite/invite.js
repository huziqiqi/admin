// pages/ckztd/ckztd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: getApp().url + "/address",
      data: {
        userId: 1,
        type: 2
      },
      method: "POST",
      success: (res) => {
        this.setData({
          items: res.data.data
        })
      }
    })
  },
  chooseAddress(e) {
    wx.setStorage({
      key: "address",
      data: e.target.dataset.item,
      success: () => {
        wx.navigateBack({
          delta: 1
        })
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