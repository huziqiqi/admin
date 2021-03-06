// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options
    })

    this.request();

  },
request(){
  wx.request({
    url: getApp().url + "//user.used/GroupOrderDetail",
    data: {
      userid: wx.getStorageSync('user').id,
      oid: this.data.options.oid
    },
    method: "POST",
    success: (res) => {
      if (res.data.code == 200) {
        this.setData({
          item: res.data.data,
          oid: this.data.options.oid
        })
        console.log(res.data.data.wuliu);
        if (res.data.data.type==2) {
          this.kdrequest();
          
        }
      } else {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false
        })
      }
    }
  })
},

  kdrequest() {
    wx.request({
      url: getApp().url + "/user.wl",
      data: {
        uid: wx.getStorageSync('user').id,
        oid: this.data.options.oid
      },
      method: "POST",
      success: (res) => {
        if (res.data.code == 200) {
          console.log(res.data.data);
          
          console.log(JSON.parse(res.data.data.wuliu));
          
          this.setData({
          kd: JSON.parse(res.data.data.wuliu) ,
            // oid: this.data.options.oid
          })
        } else {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
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
  theGoods() {
    if (this.data.item.type == 1) {
      //自提接接口
      wx.request({
        url: getApp().url + "//user.used/okpro",
        data: {
          userid: wx.getStorageSync('user').id,
          oid: this.data.oid
        },
        method: "POST",
        success: (res) => {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
          this.request()

        }
      })
      
    } else {
      //确认收货接口
      wx.request({
        url: getApp().url + "//user.used/okpro",
        data: {
          userid: wx.getStorageSync('user').id,
          oid: this.data.oid
        },
        method: "POST",
        success: (res) => {
          wx.showModal({
            title: '提示',
            content: res.data.msg,
            showCancel: false
          })
          this.request()
        }
      })
    }

  },
  jump(){
    wx.navigateTo({
      url: "../ptxq/ptxq?proid=" + this.data.item.gid + "&userid=" + wx.getStorageSync('user').id
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