// pages/fans/fans.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fans: [],
    isGuanZhu: 1,
    userId: "",
    postedId: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.request()
  },
request(){
  wx.request({
    url: getApp().url + "/user.myfans/glist",
    data: {
      userId: wx.getStorageSync('user').id
    },
    method: "POST",
    success: (res) => {
      if (res.data.code == 301) {
        //   wx.showToast({
        //     title: res.data.msg,
        //     icon: "none"
        //   })
        // setTimeout(() => {
        //   wx.navigateBack({
        //     deita: 1
        //   })
        // }, 1500);
      } else {
        this.setData({
          fans: res.data.data.follow,
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
  isGuanZhu(e) {
    wx.request({
      url: getApp().url + "//user.myfans/cancel",
      data: {
        userId: wx.getStorageSync('user').id,
        id: parseInt(e.target.dataset.id),
      },
      method: "POST",
      success: (res) => {
        wx.showToast({
          title: res.data.msg
        })
       this.request()
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