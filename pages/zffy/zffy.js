// pages/zffy/zffy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pages: 1,
    type: 1

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
      items:[]
    })
    this.request()
  },
  request() {
    wx.request({
      url: getApp().url + "/user.myprice/szlist",
      data: {
        pages: this.data.pages,
        lx: this.data.type,
        userId: wx.getStorageSync('user').id
      },
      method: "POST",
      success: (res) => {
        if (res.data.data.num == 0) {
          // wx.showToast({
          //   title: "暂无返佣记录",
          //   icon: "none"
          // })
        } else {
          this.setData({
            items: res.data.data.orderlists
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
    this.request()

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