// pages/withdrawal/withdrawal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount: 0,
    price: 0,
    num:1,
    issdtx:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (opt) {
   

  },

stop(){
  console.log("阻止冒泡");
  
},
  request() {
    wx.request({
      url: getApp().url + "//user.myprice",
      data: {
        userId: wx.getStorageSync('user').id
      },
      method: "POST",
      success: (res) => {
        this.setData({
          item: res.data.data
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
    this.request()
  },
/**
* 自动提现
*/
  zdtx(e){
    console.log(e);
    if (this.data.num == 1) {
      //微信提现
      var truename = e.detail.value.truename1
      var number = e.detail.value.number1
    } else {
      //支付宝提现

      var truename = e.detail.value.truename2
      var number = e.detail.value.number2
    }
   const obj ={
      url: getApp().url + "//user.myprice/cash",
      data: {
        userId: wx.getStorageSync('user').id,
        price: e.detail.value.meony,
        type: this.data.num,
        truename, number
      },
      method: "POST",
      success: (res) => {
        if (res.data.code==200) {
          this.setData({ issdtx: true })
          this.request()
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: "none"
          })
        }
    
      }
    }
    console.log(e.detail.value.meony);
    
    if (e.detail.value.meony<100) {
      wx.showToast({
        title: "提现额度必须大于100",
        icon: "none"
      })
    } else {
      wx.request(obj)
    }
  },
  submitForm(e) {
    console.log(e.detail.value.meony);

    this.zdtx(e)
   
  },
  isShow(){
    this.setData({
      issdtx:false
    })
  },
  txend(){
     const obj={
       delta: 1
     }
     wx.navigateBack(obj) 
  },
  changeOil(e){
    this.setData({
      num: e.target.dataset.num
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