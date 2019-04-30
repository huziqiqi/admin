// pages/fans/fans.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fans: [],
    isGuanZhu: "",
    userId: "",
    postedId: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    this.request()
  },
  request() {
    wx.request({
      url: getApp().url + "//user.myfans",
      data: {
        userId: wx.getStorageSync('user').id
      },
      method: "POST",
      success: (res) => {
        this.setData({
          fans: res.data.data.fans,
          userId: getApp().userId
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  isGuanZhu(e) {
    let isGuanZhu
    let url
    if (e.target.dataset.type == 2) {
      url = getApp().url + "//guanZhu"
      isGuanZhu = 1
      this.guanZhu(url, isGuanZhu)
    } else {
      url = getApp().url + "//cancelZhu"
      isGuanZhu = 2
      this.guanZhu(url, isGuanZhu)
    }

  },
  guanZhu(url) {
    wx.request({
      url: url,
      data: {
        userId: this.data.userId,
        postedId: this.data.postedId,
      },
      method: "POST",
      success: (res) => {
        if (res.data.msg == "关注成功" || res.data.msg == "取消成功") {
          wx.showToast({
            title: res.data.msg
          })
          if (res.data.msg == "关注成功") {
            var isGuanZhu = 1
          } else {
            var isGuanZhu = 2
          }
          this.request()

        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
      }
    })
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