// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [],
    userId: "",
    type: ""
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
    if (opt.type == 1) {
      wx.setNavigationBarTitle({
        title: "地址管理"
      })
    } else {
      wx.setNavigationBarTitle({
        title: "选择自提点"
      })
    }
    this.setData({
      type: opt.type
    })
  },
  getaddress() {
    wx.request({
      url: getApp().url + "/address",
      method: "POST",
      data: {
        userId: wx.getStorageSync('user').id,
        type: this.data.type,
      },
      success: (res) => {
        this.setData({
          address: res.data.data,
        })
      }
    })
  },
  defaddress(e) {
    wx.request({
      url: getApp().url + "/mrAddress",
      data: {
        userId: wx.getStorageSync('user').id,
        addressId: e.currentTarget.dataset.item.id,
        type: this.data.type
      },
      method: "POST",
      success: (res) => {}
    })
  },
  delAddress(e) {
    wx.showModal({
      title: "确认删除",
      content: "您确认要删除此收货地址吗?",
      success: () => {
        wx.request({
          url: getApp().url + "/delAddress",
          data: {
            userId: wx.getStorageSync('user').id,
            addressId: e.currentTarget.dataset.id
          },
          method: "POST",
          success: (res) => {
            let i = e.currentTarget.dataset.index
            let address = this.data.address
            address.splice(i, 1)
            this.setData({
              address
            })
          }
        })
      }
    })
  },
  chooseAddress(e) {
    wx.setStorage({
      key: "shdz",
      data: e.currentTarget.dataset.item,
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
    this.getaddress()

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