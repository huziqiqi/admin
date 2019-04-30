// pages/goodsImg/goodsImg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: ['../../images/banner01.jpg', '../../images/banner01.jpg'],
    curIndex: 0,
    updateImgArr: []
  },

  updateImg() {
    const that = this;
    let result = that.data.updateImgArr;
    if (result.length < 3) {
      wx.chooseImage({
        count: 1,
        sourceType: ['album', 'camera'],
        success: function (res) {
          let arr = res.tempFilePaths;
          if (arr.length === 1) {
            result.push(arr[0]);
          } else {
            arr.forEach((item) => {
              result.push(item);
            })
          }
          that.setData({
            updateImgArr: result
          })
        },
      })
    }
  },

  indexChange(e) {
    this.setData({
      curIndex: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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