// pages/participate/participate.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: [{
        'sellerAvatar': '../../images/avan.gif',
        'name': "张晓",
        'sum': 3,
        'status': 0,
        'goodsImg': '../../images/ptxq.jpg',
        'title': 'MINIPLUS鲜花包月生日礼物送女友爱人…',
        'goodsNum': 1,
        'price': 129,
        'orderNum': '219182617',
        'orderTime': '2019-01-20  09:31'
      },
      {
        'sellerAvatar': '../../images/avan.gif',
        'name': "张晓",
        'sum': 3,
        'status': 1,
        'goodsImg': '../../images/ptxq.jpg',
        'title': 'MINIPLUS鲜花包月生日礼物送女友爱人…',
        'goodsNum': 1,
        'price': 129,
        'orderNum': '219182617',
        'orderTime': '2019-01-20  09:31'
      },
      {
        'sellerAvatar': '../../images/avan.gif',
        'name': "张晓",
        'sum': 3,
        'status': 2,
        'goodsImg': '../../images/ptxq.jpg',
        'title': 'MINIPLUS鲜花包月生日礼物送女友爱人…',
        'goodsNum': 1,
        'price': 129,
        'orderNum': '219182617',
        'orderTime': '2019-01-20  09:31'
      },
      {
        'sellerAvatar': '../../images/avan.gif',
        'name': "张晓",
        'sum': 3,
        'status': 3,
        'goodsImg': '../../images/ptxq.jpg',
        'title': 'MINIPLUS鲜花包月生日礼物送女友爱人…',
        'goodsNum': 1,
        'price': 129,
        'orderNum': '219182617',
        'orderTime': '2019-01-20  09:31'
      },
      {
        'sellerAvatar': '../../images/avan.gif',
        'name': "张晓",
        'sum': 3,
        'status': 4,
        'goodsImg': '../../images/ptxq.jpg',
        'title': 'MINIPLUS鲜花包月生日礼物送女友爱人…',
        'goodsNum': 1,
        'price': 129,
        'orderNum': '219182617',
        'orderTime': '2019-01-20  09:31'
      },
      {
        'sellerAvatar': '../../images/avan.gif',
        'name': "张晓",
        'sum': 5,
        'status': 1,
        'goodsImg': '../../images/ptxq.jpg',
        'title': 'MINIPLUS鲜花包月生日礼物送女友爱人…',
        'goodsNum': 1,
        'price': 129,
        'orderNum': '219182617',
        'orderTime': '2019-01-20  09:31'
      }
    ]
  },

  navigate(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.url,
    })
  },

  theGoods() {},

  /**
   * 生命周期函数--监听页面加载
   *
   * */
  onLoad: function (opt) {
    this.setData({
      gid: opt.proid
    })

  },
  request() {
    wx.request({
      url: getApp().url + "//user.used/GroupOrder",
      data: {
        userid: wx.getStorageSync('user').id,
        gid: this.data.gid
      },
      method: "POST",
      success: (res) => {
        this.setData({
          title: res.data.data.title,
          tnum: res.data.data.tnum,
          dnum: res.data.data.dnum,
          list: res.data.data.list,
          allprice: res.data.data.allprice
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
  sqtk(e){

   wx.showModal({
     title: "提示",
     content:"您确认给用户退款吗",
     showCancel: true,
     cancelText:"取消",
     confirmText:"确定",
     //cancelColor:"#000",
     //confirmColor:"#576B95",
     success:()=>{
       wx.request({
         url: getApp().url + "/user.used/refund",
         data: {
           id: e.currentTarget.dataset.id,
           ordernum: e.currentTarget.dataset.ordernum
         },
         method: "POST",
         success: (res) => {
          wx.showModal({
            title: "提示",
            content:res.data.msg,
            showCancel: false,
            //cancelText:"取消",
            //confirmText:"确定",
            //cancelColor:"#000",
            //confirmColor:"#576B95",
            success:()=>{
              this.request()
            },
            //fail: () => {},
            //complete: () => {},
          })
         }
       })

     },
     //fail: () => {},
     //complete: () => {},
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