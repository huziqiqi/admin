// pages/cash/cash.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userId: getApp().userId,
    pages: 1,
    product: [],
    num: 0,
    allpage: 1,
    allprice: 0,
    type:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.request()
    wx.request({
      url: getApp().url + "/user.index",
      data: {
        userid: wx.getStorageSync('user').id
      },
      method: "POST",
      success: (res) => {
        this.setData({
          item: res.data.data
        })
      }
    })
  },
  request() {
    wx.request({
      url: getApp().url + "/user.myprice/cashlist",
      data: {
        userId: wx.getStorageSync('user').id,
        pages:this.data.pages,
        type:this.data.type
      },
      method: "POST",
      success: (res) => {
        if (res.data.data.num == 0) {
          // wx.showToast({
          //   title: "暂无提现记录",
          //   icon: "none"
          // })
          // setTimeout(() => {
          //   wx.navigateBack({
          //     deita: 1
          //   })
          // }, 1500);
        } else {
          let product
          this.data.pages > 1 ? product = this.data.product.concat(res.data.data.txlists) : product = res.data.data.txlists
          this.setData({
            product,
            num: res.data.data.success,
            allpage: res.data.data.allpage,
            allprice: res.data.data.allprice,
          })
        }


      }
    })
  },
  changeOil(e) {
    this.setData({
      type: parseInt(e.target.dataset.type),
      product:[]
    })
    this.request()
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
  onPullDownRefresh() {
    this.setData({
      page: 1
    })
    this.request()
  },
  onReachBottom() {
    if (this.data.pages < this.data.allpage) {
      this.setData({
        pages: this.data.pages + 1
      }) 
    this.request()

    }
   
  },

  /**
   * 页面上拉触底事件的处理函数
   */

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})