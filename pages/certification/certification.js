// pages/certification/certification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ischeck: false,
    infolink:"https://wechat.mayituandui.vip/index.php/user.help/helpinfo/id/2"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  check() {
    this.setData({
      ischeck: !this.data.ischeck
    })
  },
  jump() {
    if (this.data.ischeck) {
      wx.navigateTo({
        url: '../releaseCertification/releaseCertification'
      })
    } else {
      wx.showToast({
        title: "请先阅读并同意《蚁拼服务协议》",
        icon: "none"
      })
    }

  },
  jumpxy(){
    wx.navigateTo({
      
      url: './webContainer?url='+this.data.infolink
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