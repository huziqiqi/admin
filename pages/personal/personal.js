// pages/personal/personal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    openid: " ",
    nickname: " ",
    headimgurl: " ",
    userId: 11
  },
  navigate() {
    wx.navigateTo({
      url: '../certification/certification',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideTabBar()
    this.setData({
      user: wx.getStorageSync("userInfo")
    })
    wx.getStorage({
      key: "userID",
      success: (res) => {
        let aaa = getApp().userId = res.data
        this.setData({
          isLogin: true
        })
      },
      fail: () => {
        this.setData({
          isLogin: false
        })
      }
    })
  },
  getUser(e) {
    wx.setStorage({
      key: "userId",
      data: 11
    })
    if (e.detail.userInfo) {
      wx.login({
        success: (res) => {
          this.setData({
            isLogin: true,
            openid: res.code,
            nickname: e.detail.userInfo.nickName,
            headimgurl: e.detail.userInfo.avatarUrl,
          })
        }
      })
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