// pages/updateLogistics/updateLogistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    logistics: '请选择',
    logisticsArr: 0
  },
  bindPickerChange: function (e) {
    this.setData({
      logisticsArr: e.detail.value,
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {

    wx.request({
      url: getApp().url + "//user.used/wuliu",
      data: {},
      method: "POST",
      success: (res) => {
        let logistics = [{
          title: false,
          name: "请选择物流"
        }].concat(res.data.data)

        this.setData({
          logistics,
          oid: opt.oid
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  submitForm(e) {

    wx.request({
      url: getApp().url + "//user.used/addwl",
      data: {
        userid: wx.getStorageSync('user').id,
        oid: this.data.oid,
        logistics_name: this.data.logistics[this.data.logisticsArr].name,
        logistics_num: e.detail.value.logistics_num
      },
      method: "POST",
      success: (res) => {
        if (res.data.code==200) {
          wx.showModal({
            title: "提示",
            content: res.data.msg,
            showCancel: false,
            //cancelText:"取消",
            //confirmText:"确定",
            //cancelColor:"#000",
            //confirmColor:"#576B95",
            success:()=>{
              wx.navigateBack({
                detlta: 1
              })
            },
            //fail: () => {},
            //complete: () => {},
          })
        } else {
          wx.showModal({
            title: "提示",
            content: res.data.msg,
            showCancel: false,
            //cancelText:"取消",
            //confirmText:"确定",
            //cancelColor:"#000",
            //confirmColor:"#576B95",
            //success:()=>{},
            //fail: () => {},
            //complete: () => {},
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